package org.example.controller;

import org.example.entity.Vehicle;
import org.example.exceptions.ForbiddenException;
import org.example.exceptions.ValidationException;
import org.example.model.RegistrationInfoResponseModel;
import org.example.service.VehicleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class UserController {

    private final VehicleService vehicleService;

    public UserController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/registration")
    public RegistrationInfoResponseModel checkRegistration(@RequestHeader("registrationCode") String registrationCode) throws ValidationException, ForbiddenException {

        if (registrationCode.isEmpty()){
            throw new ValidationException("registrationCode");
        }
        Vehicle vehicle = vehicleService.getVehicleByRegistrationCode(registrationCode).orElseThrow(ForbiddenException::new);
        // check validity
        RegistrationInfoResponseModel registrationInfoResponseModel = new RegistrationInfoResponseModel();
        registrationInfoResponseModel.setValidUntil(vehicle.getValidUntil());
        if (new Date().before(vehicle.getValidUntil())) {
            registrationInfoResponseModel.setMessage("Your registration is still valid.");
        } else {
            registrationInfoResponseModel.setMessage("Your registration has expired.");
        }
        return registrationInfoResponseModel;
    }

}
