package com.auction.backend.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.backend.model.Auction;
import com.auction.backend.model.Image;
import com.auction.backend.repository.AuctionRepository;
import com.auction.backend.repository.ImageRepository;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private ImageRepository imageRepository;

    public Auction create(Auction auction) {
        return auctionRepository.save(auction);
    }

    public Auction update(Auction auction) {
        Auction auctionSaved = auctionRepository.findById(auction.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        auctionSaved.setTitle(auction.getTitle());
        return auctionRepository.save(auctionSaved);
    }

    public void delete(Long id) {
        Auction auctionSaved = auctionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        auctionRepository.delete(auctionSaved);
    }

    public List<Auction> listAll() {
        return auctionRepository.findAll();
    }

    public void saveImages(Long auctionId, List<Image> images) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new NoSuchElementException("Auction not found"));
        for (Image image : images) {
            image.setAuction(auction);
            imageRepository.save(image);
        }
    }
}