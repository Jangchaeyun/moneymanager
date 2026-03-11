package com.cherry.manager.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cherry.manager.dto.ExpenseDTO;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
	private final ProfileRepository profileRepository;
	private final EmailService emailService;
	private final ExpenseService expenseService;
	
	@Value("${money.manager.frontend.url}")
	private String frontendUrl;
	
	@Scheduled(cron = "0 0 22 * * *", zone="Asia/Seoul")
	public void sendDailyIncomeExpenseReminder() {
		log.info("Job started: sendDailyIncomeExpenseReminder()");
		List<ProfileEntity> profiles = profileRepository.findAll();
		for(ProfileEntity profile : profiles) {
			String body = "안녕하세요. " + profile.getFullName() + "<br><br>"
					+ "오늘의 수입과 지출 내역을 Money Manager에 입력하는 것을 잊지 마세요. <br><br>"
					+ "<a href="+frontendUrl+" style='display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;'>Money Manager로 이동</a>"
					+ "<br><br>감사합니다. <br>Money Manager 팀";
			emailService.sendEmail(profile.getEmail(), "매일 알림: 수입과 지출을 기록하세요", body);
		}
		log.info("Job complete: sendDailyIncomeExpenseReminder()");
	}
	
	@Scheduled(cron = "0 0 23 * * *", zone="Asia/Seoul")
	public void sendDailyExpenseSummary() {
		log.info("Job started: sendDailyExpenseSummary()");
		List<ProfileEntity> profiles = profileRepository.findAll();
		for (ProfileEntity profile : profiles) {
			List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now(ZoneId.of("Asia/Seoul")));
			if (!todaysExpenses.isEmpty()) {
				StringBuilder table = new StringBuilder();
				table.append("<table style='border-collapse:collapse;width=100%;'>");
				table.append("<tr style='background-color:#f2f2f2;'><th style='border:1px solid #ddd;padding:8px;'>S.No</th><th style='border:1px solid #ddd;padding:8px;'>이름</th><th style='border:1px solid #ddd;padding:8px;'>금액</th><th style='border:1px solid #ddd;padding:8px;'>카테고리</th></tr>");
				int i = 1;
				for (ExpenseDTO expense : todaysExpenses) {
					table.append("<tr>");
					table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(i++).append("</td>");
					table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getName()).append("</td>");
					table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getAmount()).append("</td>");
					table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getCategoryId() != null ? expense.getCategoryName() : "N/A").append("</td>");
					table.append("</tr>");
				}
				
				table.append("</table>");
				String body = "안녕하세요. " + profile.getFullName() + "<br /><br /> 다음은 오늘 지출 내역 요약입니다.: <br /><br />" + table + "<br /><br />진심으로 감사드립니다. <br /> Money Manager 팀";
				emailService.sendEmail(profile.getEmail(), "일일 지출 내역", body);
			}
		}
		log.info("Job completed: sendDailyExpenseSummary()");
	}
}
