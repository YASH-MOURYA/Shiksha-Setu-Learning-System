package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.CommonApiResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/health")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HealthController {

    @GetMapping
    @Operation(summary = "Health check endpoint")
    public ResponseEntity<CommonApiResponse> healthCheck() {
        CommonApiResponse response = new CommonApiResponse();
        response.setResponseMessage("Shiksha Setu Backend is running successfully! 🚀");
        response.setSuccess(true);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    @Operation(summary = "Detailed status check")
    public ResponseEntity<Object> getStatus() {
        return ResponseEntity.ok(new Object() {
            public final String status = "UP";
            public final String application = "Shiksha Setu LMS";
            public final String version = "1.0.0";
            public final long timestamp = System.currentTimeMillis();
            public final String message = "🎓 Learning Management System is ready!";
        });
    }
}