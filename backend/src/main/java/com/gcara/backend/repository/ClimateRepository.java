package com.gcara.backend.repository;

import com.gcara.backend.model.ClimateData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClimateRepository extends JpaRepository<ClimateData, Long> {
}
