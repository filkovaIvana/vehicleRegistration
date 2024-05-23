package org.example.model;

import java.util.Date;

public class RegistrationInfoResponseModel {

    private Date validUntil;
    private String message;

    public RegistrationInfoResponseModel() {
    }

    public RegistrationInfoResponseModel(Date validUntil, String message) {
        this.validUntil = validUntil;
        this.message = message;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}