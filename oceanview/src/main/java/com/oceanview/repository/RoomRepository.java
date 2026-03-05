package com.oceanview.repository;

import com.oceanview.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {
    Room findByRoomType(String roomType);
}