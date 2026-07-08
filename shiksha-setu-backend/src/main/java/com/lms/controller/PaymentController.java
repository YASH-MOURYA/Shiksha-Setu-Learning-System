package com.lms.controller;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.CommonApiResponse;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/payment")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {org.springframework.web.bind.annotation.RequestMethod.GET, org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.PUT, org.springframework.web.bind.annotation.RequestMethod.DELETE, org.springframework.web.bind.annotation.RequestMethod.OPTIONS})
public class PaymentController {

	@GetMapping("/all")
	@Operation(summary = "Api to fetch all payments")
	public ResponseEntity<CommonApiResponse> getAllPayments() {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payments fetched successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	@Operation(summary = "Api to fetch payment by id")
	public ResponseEntity<CommonApiResponse> getPaymentById(@RequestParam("id") Integer paymentId) {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payment fetched successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/process")
	@Operation(summary = "Api to process payment")
	public ResponseEntity<CommonApiResponse> processPayment(@RequestBody CommonApiResponse request) {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payment processed successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/verify")
	@Operation(summary = "Api to verify payment")
	public ResponseEntity<CommonApiResponse> verifyPayment(@RequestBody CommonApiResponse request) {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payment verified successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/history")
	@Operation(summary = "Api to fetch payment history")
	public ResponseEntity<CommonApiResponse> getPaymentHistory() {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payment history fetched successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{id}/refund")
	@Operation(summary = "Api to refund payment")
	public ResponseEntity<CommonApiResponse> refundPayment(@RequestParam("id") Integer paymentId) {
		CommonApiResponse response = new CommonApiResponse();
		response.setResponseMessage("Payment refunded successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}

}
