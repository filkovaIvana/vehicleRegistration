package org.example.service;

import org.example.entity.User;
import org.example.entity.Vehicle;
import org.example.exceptions.RegisterCodeAlreadyExistException;
import org.example.model.VehicleRegistrationRequestModel;
import org.example.repository.UserRepository;
import org.example.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final UserService userService;
    private final UserRepository userRepository;
    //    private UserRepository userRepository;
    private VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository, UserService userService, UserRepository userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public Optional<Vehicle> getVehicleByRegistrationCode(String registrationCode) {
        return vehicleRepository.findByRegistrationCode(registrationCode);
    }

    public boolean registerVehicle(VehicleRegistrationRequestModel model, User user) throws RegisterCodeAlreadyExistException {
         if (vehicleRepository.findByRegistrationCode(model.getRegistrationCode()).isPresent()) {
             throw new RegisterCodeAlreadyExistException();
         }

        Vehicle vehicle = new Vehicle();
        vehicle.setUser(user);
        vehicle.setRegistrationCode(model.getRegistrationCode());
        vehicle.setValidUntil(model.getValidUntil());
        vehicleRepository.save(vehicle);
        return true;
        //        if(userRepository.findByEmail(model.getEmail()).isPresent()){
//             throw new DuplicateEmailFoundException();
//        }
    }

//    public void getStatisticsReport(){
//        List<User> list = new ArrayList<>();
//        super.getAll().forEach(user -> list.add(user));
//        List<User_Response> return_list = list.stream().map(User_Response::new).collect(Collectors.toList());
//        return return_list;
//    }

    public List<User> getStatisticsReport() {
        return userRepository.findAll();
//                .map(UserModelForAdmin::new)
//                .collect(Collectors.toList());
    }


//    public Map<String, Integer> wordCount(String[] accountIDs) {
//        Map<String, Integer> map = new HashMap<>();
//        for (String accountID:accountIDs) {
//
//            if (!map.containsKey(accountID)) {  // first time we've seen this string
//                map.put(accountID, 1);
//            }
//            else {
//                int count = map.get(accountID);
//                map.put(accountID, count + 1);
//            }
//        }
//        return map;
//    }

}
