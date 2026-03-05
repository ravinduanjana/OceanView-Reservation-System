package com.oceanview.controller;

import com.oceanview.model.Room;
import com.oceanview.model.User;
import com.oceanview.service.RoomService;
import com.oceanview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserRepository userRepository;

    // Add room (Admin only)
    @PostMapping
    public Room addRoom(@RequestBody Room room,
                        @RequestParam String username){
        User user = userRepository.findByUsername(username);
        if(user != null && user.getRole().equals("ADMIN")){
            return roomService.addRoom(room);
        }
        throw new RuntimeException("Only admin can add rooms");
    }

    // Update room rate (Admin only)
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable String id,
                           @RequestBody Room updatedRoom,
                           @RequestParam String username){
        User user = userRepository.findByUsername(username);
        if(user != null && user.getRole().equals("ADMIN")){
            return roomService.updateRoom(id, updatedRoom);
        }
        throw new RuntimeException("Only admin can update rooms");
    }
}