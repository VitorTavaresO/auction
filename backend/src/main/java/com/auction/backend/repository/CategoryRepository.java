package com.auction.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}