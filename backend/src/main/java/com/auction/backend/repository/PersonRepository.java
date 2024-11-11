package com.auction.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.backend.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findbyEmail(String email);
}
