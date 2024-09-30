package com.auction.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.backend.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    
}
