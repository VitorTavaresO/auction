package com.auction.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.backend.model.Bid;
import com.auction.backend.repository.BidRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid create(Bid bid) {    
        return bidRepository.save(bid);
    }

    public Bid update(Bid bid) {      
        Bid bidSaved = bidRepository.findById(bid.getId())
                .orElseThrow(() -> new NoSuchElementException("Bid not found"));
        bidSaved.setBidValue(bid.getBidValue());
        bidSaved.setDateTime(bid.getDateTime());
        return bidRepository.save(bidSaved);
    }

    public void delete(Long id) {
        Bid bidSaved = bidRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bid not found"));
        bidRepository.delete(bidSaved);
    }

    public List<Bid> listAll() {
        return bidRepository.findAll();
    }
}