package com.auction.backend.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.backend.model.Person;
import com.auction.backend.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person create(Person Person){
        return personRepository.save(Person);
    }

    public Person update(Person Person){
        Person savedPerson = personRepository.findById(Person.getId()).orElseThrow(() -> new NoSuchElementException("Person not found"));
        savedPerson.setName(Person.getName());
        savedPerson.setEmail(Person.getEmail());
        return personRepository.save(savedPerson);
    }
    

}
