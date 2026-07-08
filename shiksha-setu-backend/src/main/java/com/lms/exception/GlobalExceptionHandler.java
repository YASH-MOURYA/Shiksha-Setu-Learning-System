package com.lms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import com.lms.dto.CommonApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<CommonApiResponse> handleJsonParseError(HttpMessageNotReadableException ex) {
		CommonApiResponse apiResponse = CommonApiResponse.builder()
				.responseMessage("Invalid request body: " + ex.getMessage())
				.success(false)
				.build();
		return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<CommonApiResponse> handleUserNotFoundException(UserNotFoundException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = CommonApiResponse.builder().responseMessage(responseMessage).success(false)
				.build();
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(UserSaveFailedException.class)
	public ResponseEntity<CommonApiResponse> handleUserRegistrationFailedException(UserSaveFailedException ex) {
		String responseMessage = ex.getMessage();

		CommonApiResponse apiResponse = CommonApiResponse.builder().responseMessage(responseMessage).success(false)
				.build();
		return new ResponseEntity<CommonApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);

	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<CommonApiResponse> handleGenericException(Exception ex) {

		CommonApiResponse apiResponse = CommonApiResponse.builder()
				.responseMessage(
						ex.getMessage() != null ? ex.getMessage() : "Internal Server Error")
				.success(false)
				.build();

		ex.printStackTrace(); // 🔥 IMPORTANT for debugging

		return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}


}
