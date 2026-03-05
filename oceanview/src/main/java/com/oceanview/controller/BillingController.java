package com.oceanview.controller;

import com.oceanview.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping
    public double calculateBill(@RequestParam String roomType,
                                @RequestParam int days){
        return billingService.calculateBill(roomType, days);
    }
}