package org.example.model;


public class VehicleRegistrationResponseModel {

    private boolean success = false;
    private String description;

    public VehicleRegistrationResponseModel() {
    }

    public VehicleRegistrationResponseModel(boolean success, String description) {

        this.success = success;
        this.description = description;

//        // check validity
//        if(new Date().before(vehicle.getValidUntil())) {
//            this.success = true;
//            this.description = "";
//        } else {
//            this.success = false;
//            this.description = "Provided registration\n" +
//                    "code already exists.";
//        }


//        this.id = user.getId();
//
//        this.gender = user.getGender();
//        this.firstname = user.getFirstname();
//        this.lastname = user.getLastname();
//        this.email = user.getEmail();
//        this.telNumber = user.getTelNumber();
//        this.paymentTitle = user.getPaymentTitle();
//        this.paymentFirstName = user.getPaymentFirstname();
//        this.paymentLastName = user.getPaymentLastname();
//        this.paymentCompany = user.getPaymentCompany();
//        this.paymentStreet =  user.getPaymentStreet();
//        this.paymentPostcode =  user.getPaymentPostcode();
//        this.paymentCity = user.getPaymentCity();
//        this.paymentState =  user.getPaymentState();
//        this.paymentCountry =  user.getPaymentCountry();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
