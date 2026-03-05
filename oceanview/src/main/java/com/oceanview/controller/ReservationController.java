package com.oceanview.controller;

import com.oceanview.model.Reservation;
import com.oceanview.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Add reservation
    @PostMapping
    public Reservation addReservation(@RequestBody Reservation reservation){
        return reservationService.addReservation(reservation);
    }

    // View all reservations
    @GetMapping
    public List<Reservation> getAll(){
        return reservationService.getAllReservations();
    }

    // Update full reservation
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable String id,
                                         @RequestBody Reservation reservation){
        return reservationService.updateReservation(id, reservation);
    }

    // Update status only
    @PutMapping("/{id}/status")
    public Reservation updateStatus(@PathVariable String id,
                                    @RequestParam String status){
        return reservationService.updateStatus(id, status);
    }

    // Delete reservation
    @DeleteMapping("/{id}")
    public String deleteReservation(@PathVariable String id){
        boolean deleted = reservationService.deleteReservation(id);
        if(deleted){
            return "Reservation deleted successfully!";
        } else {
            return "Reservation not found!";
        }
    }
}