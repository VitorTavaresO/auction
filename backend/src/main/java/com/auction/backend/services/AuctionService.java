package com.auction.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.backend.model.Auction;
import com.auction.backend.repository.AuctionRepository;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository AuctionRepository;

    public Auction create(Auction Auction) {    
        return AuctionRepository.save(Auction);
    }

    public Auction update(Auction Auction) {      
        Auction AuctionSaved = AuctionRepository.findById(Auction.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        AuctionSaved.setTitle(Auction.getTitle());
        return AuctionRepository.save(AuctionSaved);
    }

    public void delete(Long id) {
        Auction AuctionSaved = AuctionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        AuctionRepository.delete(AuctionSaved);
    }

    public List<Auction> listAll() {
        return AuctionRepository.findAll();
    }
}