package com.auction.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.backend.model.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

}