package com.auction.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.auction.backend.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}