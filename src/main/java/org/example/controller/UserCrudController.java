package org.example.controller;

import org.example.entity.User;
import org.example.model.User_Response;
import org.example.repository.UserRepository;
import org.example.security.BuiltInRightsForPreAuthorizeHavingAuthority;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/crudApi")
public class UserCrudController extends EntityCrudController<User> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    public UserCrudController(JpaRepository<User, String> repository) {
        super(repository, "/crudApi/user");
    }

    @PreAuthorize(BuiltInRightsForPreAuthorizeHavingAuthority.LIST)
    @GetMapping("/user/all")
    Iterable<User_Response> getAll(HttpServletRequest request) {
        List<User> list = new ArrayList<>();
        super.getAll().forEach(user -> list.add(user));
        List<User_Response> return_list = list.stream().map(User_Response::new).collect(Collectors.toList());
        return return_list;
    }

    @GetMapping("/userInfo/{userName}")
    User getByUserName(@PathVariable String userName) {
        return userRepository.findById(userName).get();
    }

    @PreAuthorize(BuiltInRightsForPreAuthorizeHavingAuthority.EDIT)
    @PutMapping("/user")
    ResponseEntity<User> update(@Valid @RequestBody User record) {
        return super.update(record);
    }

    @PreAuthorize(BuiltInRightsForPreAuthorizeHavingAuthority.REMOVE)
    @DeleteMapping("/user/{id}")
    public ResponseEntity<User> delete(@PathVariable String id) {
        return super.delete(id);
    }

}

