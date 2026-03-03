package com.cherry.manager.service;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.ExpensesDTO;
import com.cherry.manager.entity.CategoryEntity;
import com.cherry.manager.entity.ExpenseEntity;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.CategoryRepostiory;
import com.cherry.manager.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {
	private final CategoryService categoryService;
	private final ExpenseRepository expenseRepository;
	private final ProfileService profileService;
	private final CategoryRepostiory categoryRepostiory;
	
	public ExpensesDTO addExpenses(ExpensesDTO dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		CategoryEntity categery = categoryRepostiory.findById(dto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		ExpenseEntity newExpense = toEntity(dto, profile, categery);
		newExpense = expenseRepository.save(newExpense);
		return toDTO(newExpense);
	}
	
	private ExpenseEntity toEntity(ExpensesDTO dto, ProfileEntity profile, CategoryEntity category) {
		return ExpenseEntity.builder()
				.name(dto.getName())
				.icon(dto.getIcon())
				.amout(dto.getAmount())
				.date(dto.getDate())
				.profile(profile)
				.category(category)
				.build();
	}
	
	private ExpensesDTO toDTO(ExpenseEntity entity) {
		return ExpensesDTO.builder()
			.id(entity.getId())
			.name(entity.getName())
			.icon(entity.getIcon())
			.categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
			.categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
			.amount(entity.getAmout())
			.date(entity.getDate())
			.createdAt(entity.getCreatedAt())
			.updatedAt(entity.getUpdatedAt())
			.build();
	}
}
