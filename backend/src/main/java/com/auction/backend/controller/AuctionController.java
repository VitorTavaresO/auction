package com.auction.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.backend.model.Auction;
import com.auction.backend.services.AuctionService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService AuctionService;

    @PostMapping
    public Auction create(@RequestBody Auction Auction) {
        return AuctionService.create(Auction);
    }

    @PutMapping
    public Auction update(@RequestBody Auction Auction) {
        return AuctionService.create(Auction);
    }

    @GetMapping
    public List<Auction> listAll() {
        return AuctionService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        AuctionService.delete(id);
    }

    @GetMapping("/find")
    public String find(@PathParam("name") String name,
            @PathParam("age") Integer age) {    
        System.out.println(name + " " + age);
        return name + " " + age;
    }
}