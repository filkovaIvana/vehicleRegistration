package org.example.controller;

import org.example.exceptions.ValidationException;
import org.example.exceptions.ValidationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Controller
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public final ResponseEntity<ValidationResponse> handleEmptyInputException(ValidationException ex, WebRequest request) {
        ValidationResponse validationResponse = new ValidationResponse().addError(ex.getMessage(), "field_required");
        return new ResponseEntity<>(validationResponse, HttpStatus.BAD_REQUEST);
    }

}