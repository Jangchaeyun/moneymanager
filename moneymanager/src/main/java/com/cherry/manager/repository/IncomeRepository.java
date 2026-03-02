package com.cherry.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cherry.manager.entity.IncomeEntity;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {
	
}
