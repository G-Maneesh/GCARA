package com.gcara.backend.service;

import com.gcara.backend.model.ClimateData;
import com.gcara.backend.repository.ClimateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import java.time.LocalDateTime;

@Service
public class ClimateService {

    @Autowired
    private ClimateRepository repository;

    // ✅ Values read from application.properties
    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Value("${openweathermap.api.url}")
    private String apiUrl;

    public ClimateData fetchAndSaveClimateData(String city) {
        try {
            // Build the full API URL dynamically
            String url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric";

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            double temperature = json.getJSONObject("main").getDouble("temp");
            double humidity = json.getJSONObject("main").getDouble("humidity");
            double windSpeed = json.getJSONObject("wind").getDouble("speed");
            String condition = json.getJSONArray("weather").getJSONObject(0).getString("description");

            ClimateData data = new ClimateData(city, temperature, humidity, windSpeed, condition, LocalDateTime.now());
            repository.save(data);

            return data;

        } catch (Exception e) {
            System.out.println("⚠️ Error fetching weather data: " + e.getMessage());
            return null;
        }
    }
}
