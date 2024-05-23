package org.example.model;

import java.util.Date;

public class VehicleRegistrationRequestModel {

//    @NotEmpty
    private String registrationCode;

//    @NotEmpty
    private Date validUntil;

    public VehicleRegistrationRequestModel() {
    }

    public String getRegistrationCode() {
        return registrationCode;
    }

    public void setRegistrationCode(String registrationCode) {
        this.registrationCode = registrationCode;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }
}
