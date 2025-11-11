package com.gcara.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClimateData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private double temperature;
    private double humidity;
    private double windSpeed;
    private String condition;
    private LocalDateTime recordedAt;

    public ClimateData(String city, double temperature, double humidity,
                       double windSpeed, String condition, LocalDateTime recordedAt) {
        this.city = city;
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.condition = condition;
        this.recordedAt = recordedAt;
    }
}
