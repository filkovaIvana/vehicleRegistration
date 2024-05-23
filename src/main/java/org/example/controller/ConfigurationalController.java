package org.example.controller;

import org.example.entity.User;
import org.example.exceptions.DuplicateEmailFoundException;
import org.example.exceptions.RegisterCodeAlreadyExistException;
import org.example.exceptions.ValidationException;
import org.example.model.*;
import org.example.security.AuthenticationFacade;
import org.example.security.BuiltInRightsForPreAuthorizeHavingAuthority;
import org.example.service.UserService;
import org.example.service.VehicleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class ConfigurationalController {

    private UserService userService;
    private VehicleService vehicleService;
    private AuthenticationFacade authenticationFacade;

    public ConfigurationalController(UserService userService, VehicleService vehicleService, AuthenticationFacade authenticationFacade) {
        this.userService = userService;
        this.vehicleService = vehicleService;
        this.authenticationFacade = authenticationFacade;
    }

    @RequestMapping(value = "/account", method = RequestMethod.POST)
    public CreateAccountResponseModel createAccount(@RequestBody CreateAccountModel model) throws ValidationException {
        if(model.getId().isEmpty()){
            throw new ValidationException("accountID");
        }
        CreateAccountResponseModel createAccountResponseModel = new CreateAccountResponseModel();
        try {
            User createdUser = userService.create(model);
            createAccountResponseModel.setSuccess(true);
            createAccountResponseModel.setDescription("Your account has been successfully opened.");
            createAccountResponseModel.setPassword(createdUser.getPassword());
        }
        catch (DuplicateEmailFoundException duplicateEmailFoundException) {
            createAccountResponseModel.setSuccess(false);
            createAccountResponseModel.setDescription("Provided account ID already exists");
        }

        return createAccountResponseModel;
    }

    @PostMapping("/register")
    @PreAuthorize(BuiltInRightsForPreAuthorizeHavingAuthority.ADD)
    public VehicleRegistrationResponseModel registration(@Valid @RequestBody VehicleRegistrationRequestModel model) throws ValidationException {
        User user = authenticationFacade.getAuthenticatedUser();

        if(model.getRegistrationCode().isEmpty()) {
            throw new ValidationException("registrationCode");
        }

        if(model.getValidUntil() == null) {
            throw new ValidationException("ExpirationDate");
        }

        try {
            vehicleService.registerVehicle(model, user);
        } catch (RegisterCodeAlreadyExistException e) {
            return new VehicleRegistrationResponseModel(false, "Provided registration code already exists.");
            // return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new VehicleRegistrationResponseModel(true, "Vehicle registration is successfully added.");
    }

    @GetMapping("/statistics/accountID")
    @PreAuthorize(BuiltInRightsForPreAuthorizeHavingAuthority.LIST)
    public Map<String, Integer> getStatisticsReport() {
        return vehicleService.getStatisticsReport().stream().collect(Collectors.toMap(user -> user.getId().toString(), user -> user.getVehicles().size()));
    }

}
