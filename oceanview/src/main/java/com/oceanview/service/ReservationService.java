package com.oceanview.service;

import com.oceanview.model.Reservation;
import com.oceanview.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // Add new reservation
    public Reservation addReservation(Reservation reservation){
        reservation.setStatus("confirm");
        return reservationRepository.save(reservation);
    }

    // Get all reservations
    public List<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }

    // Update status only
    public Reservation updateStatus(String id, String status){
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if(reservation != null){
            reservation.setStatus(status);
            return reservationRepository.save(reservation);
        }
        return null;
    }

    // ✅ Update full reservation (guest name, room, dates, status)
    public Reservation updateReservation(String id, Reservation updatedReservation){
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if(reservation != null){
            reservation.setGuestName(updatedReservation.getGuestName());
            reservation.setRoomType(updatedReservation.getRoomType());
            reservation.setCheckInDate(updatedReservation.getCheckInDate());
            reservation.setCheckOutDate(updatedReservation.getCheckOutDate());
            reservation.setStatus(updatedReservation.getStatus());
            return reservationRepository.save(reservation);
        }
        return null;
    }

    // ✅ Delete reservation
    public boolean deleteReservation(String id){
        if(reservationRepository.existsById(id)){
            reservationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}