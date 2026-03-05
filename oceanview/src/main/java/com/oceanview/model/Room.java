package com.oceanview.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rooms")
public class Room {

    @Id
    private String id;
    private String roomType;
    private double rate;

    public Room() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public double getRate() { return rate; }
    public void setRate(double rate) { this.rate = rate; }
}