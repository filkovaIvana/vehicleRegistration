package org.example.exceptions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ValidationResponse {

    private List<FieldValidationError> validationErrors = new ArrayList<>();

    public ValidationResponse() {
    }

    public ValidationResponse addError(String field, String error) {

        Optional<FieldValidationError> fveOpt = validationErrors.stream().filter(fve -> fve.getField().equals(field) ).findFirst();
        if(fveOpt.isPresent()) {
            fveOpt.get().addError(error);
        } else {
            validationErrors.add(new FieldValidationError(field, error));
        }

        return this;
    }

    public List<FieldValidationError> getValidationErrors() {
        return validationErrors;
    }

    public void setValidationErrors(List<FieldValidationError> validationErrors) {
        this.validationErrors = validationErrors;
    }


    public static class FieldValidationError {

        private String field;
        private List<String> errors = new ArrayList<>();

        public FieldValidationError(String field, String error) {
            this.field = field;
            errors.add(error);
        }

        public FieldValidationError addError(String error) {
            errors.add(error);
            return this;
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> error) {
            this.errors = error;
        }
    }
}
