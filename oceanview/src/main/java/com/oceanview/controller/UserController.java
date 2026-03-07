package com.oceanview.controller;

import com.oceanview.model.User;
import com.oceanview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // Login (everyone)
    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user.getUsername(), user.getPassword());
    }

    // Add user (Admin authorization using password)
    @PostMapping
    public User addUser(@RequestParam String adminPassword,
                        @RequestBody User user){

        // Simple admin password check
        if(!adminPassword.equals("1234")){
            throw new RuntimeException("Invalid Admin Password");
        }

        return userService.addUser(user);
    }
}