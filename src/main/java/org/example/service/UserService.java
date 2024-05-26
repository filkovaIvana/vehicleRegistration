package org.example.service;

import org.example.entity.User;
import org.example.entity.UserRight;
import org.example.entity.UserRole;
import org.example.exceptions.DuplicateEmailFoundException;
import org.example.model.CreateAccountModel;
import org.example.model.EditAccountModel;
import org.example.repository.UserRepository;
import org.example.repository.UserRightRepository;
import org.example.repository.UserRoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private UserRoleRepository userRoleRepository;

    private UserRightRepository userRightRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserRoleRepository userRoleRepository, UserRightRepository userRightRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRoleRepository = userRoleRepository;
        this.userRightRepository = userRightRepository;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByEmail(username).orElseThrow(NoSuchElementException::new);
    }

    public Optional<User> getUserByUserId(String userId) {
        return userRepository.findById(userId);
    }


    public User create(CreateAccountModel model) {
        if(userRepository.findById(model.getId()).isPresent()){
             throw new DuplicateEmailFoundException("mail already exist");
        }
        User user = new User();
        user.setId(model.getId());
        user.setActive(true);
        user.setFirstName(model.getFirstName());
        user.setLastName(model.getLastName());
        user.setEmail(model.getId());

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        System.out.println(generatedString);

        user.setPassword(passwordEncoder.encode(generatedString));
//        user.setPhoneNumber(model.getPhoneNumber());
        UserRole userRole = new UserRole("ROLE_ADMIN");
        userRole.setDescription("This is admin role");
        UserRight userRight1 = new UserRight("LIST");
        userRightRepository.save(userRight1);
        UserRight userRight2 = new UserRight("ADD");
        userRightRepository.save(userRight2);
        UserRight userRight3 = new UserRight("EDIT");
        userRightRepository.save(userRight3);
        UserRight userRight4 = new UserRight("REMOVE");
        userRightRepository.save(userRight4);

        userRole.setRights(Arrays.asList(
                userRight1,
                userRight2,
                userRight3,
                userRight4
        ));
//        UserRole userRole = new UserRole("ROLE_STANDARD");
//        userRole.setDescription("User role");
//        userRole.setRights(Arrays.asList(new UserRight("LIST"),
//                new UserRight("ADD"), new UserRight("EDIT"),
//                new UserRight("DELETE")
//        ));

//        userRoleRepository.findByName("ROLE_ADMIN").ifPresent(defaultRole -> {
        userRoleRepository.save(userRole);
        user.addRole(userRole);
//        });

        userRepository.save(user);
        user.setPassword(generatedString);
        return user;
    }

    public User edit(User user, EditAccountModel model) {
        user.setFirstName(model.getFirstName());
        user.setLastName(model.getLastName());

        if(model.getPassword().length() > 0) {
            user.setPassword(passwordEncoder.encode(model.getPassword()));
        }
        user.setPhoneNumber(model.getPhoneNumber());

        userRepository.save(user);
        return user;
    }

    public List<User> getAllUser() {
        List<User> result = new ArrayList<User>();
        userRepository.findAll().forEach(result::add);
        return result;
    }


}

