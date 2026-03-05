package com.oceanview.service;

import com.oceanview.model.Room;
import com.oceanview.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillingService {

    @Autowired
    private RoomRepository roomRepository;

    public double calculateBill(String roomType, int days){
        Room room = roomRepository.findByRoomType(roomType);
        if(room != null){
            return room.getRate() * days;
        }
        return 0;
    }
}