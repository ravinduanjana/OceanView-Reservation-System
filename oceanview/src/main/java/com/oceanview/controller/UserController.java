package com.oceanview.controller;

import com.oceanview.model.User;
import com.oceanview.service.UserService;
import com.oceanview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // Login (everyone)
    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user.getUsername(), user.getPassword());
    }

    // Add user (Admin only)
    @PostMapping
    public User addUser(@RequestBody User user,
                        @RequestParam String username){
        User current = userRepository.findByUsername(username);
        if(current != null && current.getRole().equals("ADMIN")){
            return userService.addUser(user);
        }
        throw new RuntimeException("Only admin can add users");
    }
}