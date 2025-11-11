package com.gcara.backend.controller;

import com.gcara.backend.model.ClimateData;
import com.gcara.backend.service.ClimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/climate")
@CrossOrigin(origins = "*")
public class ClimateController {

    @Autowired
    private ClimateService service;

    @GetMapping("/live/{city}")
    public ClimateData getLiveClimate(@PathVariable String city) {
        return service.fetchAndSaveClimateData(city);
    }
}
