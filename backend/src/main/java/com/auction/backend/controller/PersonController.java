package com.auction.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.backend.model.Person;
import com.auction.backend.services.PersonService;

@RestController
@RequestMapping("api/person")
public class PersonController {
    
    @Autowired
    private PersonService personService;

    @PostMapping
    public Person create(@RequestBody Person person){
        return personService.create(person);
    }

    @PutMapping
    public Person update(@RequestBody Person person){
        return personService.update(person);
    }
    
}
