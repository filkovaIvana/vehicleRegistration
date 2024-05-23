package org.example.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateEmailFoundException extends RuntimeException{
    public DuplicateEmailFoundException(String message) {
        super(message);
    }
}
