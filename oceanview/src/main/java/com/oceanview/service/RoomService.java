package com.oceanview.service;

import com.oceanview.model.Room;
import com.oceanview.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room addRoom(Room room){
        return roomRepository.save(room);
    }

    public Room getRoomByType(String roomType){
        return roomRepository.findByRoomType(roomType);
    }

    // ✅ Update room rate
    public Room updateRoom(String id, Room updatedRoom){
        Room room = roomRepository.findById(id).orElse(null);
        if(room != null){
            room.setRoomType(updatedRoom.getRoomType());
            room.setRate(updatedRoom.getRate());
            return roomRepository.save(room);
        }
        return null;
    }
}