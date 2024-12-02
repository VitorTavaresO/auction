package com.auction.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.auction.backend.model.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

}