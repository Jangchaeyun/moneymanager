package com.cherry.manager.service;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.IncomeDTO;
import com.cherry.manager.entity.CategoryEntity;
import com.cherry.manager.entity.IncomeEntity;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.IncomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncomeService {
	private final CategoryService categoryService;
	private final IncomeRepository incomeRepository;
	
	private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category) {
		return IncomeEntity.builder()
				.name(dto.getName())
				.icon(dto.getIcon())
				.amout(dto.getAmount())
				.date(dto.getDate())
				.profile(profile)
				.category(category)
				.build();
	}
	
	private IncomeDTO toDTO(IncomeEntity entity) {
		return IncomeDTO.builder()
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
