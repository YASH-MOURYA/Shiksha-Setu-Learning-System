package com.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.BookingRequestDto;
import com.lms.dto.BookingResponseDto;
import com.lms.dto.CommonApiResponse;
import com.lms.resource.BookingResource;

@RestController
@RequestMapping("api/course/booking")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {org.springframework.web.bind.annotation.RequestMethod.GET, org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.PUT, org.springframework.web.bind.annotation.RequestMethod.DELETE, org.springframework.web.bind.annotation.RequestMethod.OPTIONS})
public class BookingController {

	@Autowired
	private BookingResource bookingResource;

	@PostMapping("add")
	public ResponseEntity<CommonApiResponse> addEvent(@RequestBody BookingRequestDto request) {
		return this.bookingResource.addBooking(request);
	}

	@GetMapping("fetch/all")
	public ResponseEntity<BookingResponseDto> fetchAllBookings() {
		return this.bookingResource.fetchAllBookings();
	}

	@GetMapping("all")
	public ResponseEntity<BookingResponseDto> getAllBookings() {
		return this.bookingResource.fetchAllBookings();
	}

	@GetMapping("fetch/course-wise")
	public ResponseEntity<BookingResponseDto> fetchAllBookingsByCourse(@RequestParam("courseId") Integer courseId) {
		return this.bookingResource.fetchAllBookingsByCourse(courseId);
	}

	@GetMapping("fetch/customer-wise")
	public ResponseEntity<BookingResponseDto> fetchAllBookingsByCustomer(
			@RequestParam("customerId") Integer customerId) {
		return this.bookingResource.fetchAllBookingsByCustomer(customerId);
	}

	@GetMapping("fetch/mentor-wise")
	public ResponseEntity<BookingResponseDto> fetchAllBookingsByMentorId(
			@RequestParam("mentorId") Integer mentorId) {
		return this.bookingResource.fetchAllBookingsByMentorId(mentorId);
	}

}
