package com.auction.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.backend.model.Person;
import com.auction.backend.model.PersonAuthRequestDTO;
import com.auction.backend.model.PersonAuthResponseDTO;
import com.auction.backend.model.PersonRecoveryPasswordDTO;
import com.auction.backend.security.JwtService;
import com.auction.backend.services.PersonService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/person")
public class PersonController {
    
    @Autowired
    private PersonService personService;

    @Autowired
    private AuthenticationManager  authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@Valid @RequestBody PersonAuthRequestDTO authRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        return new PersonAuthResponseDTO(authRequest.getEmail(), jwtService.generateToken(authentication.getName()));
    }

    @PostMapping("/send-validation-code")
    public PersonRecoveryPasswordDTO sendValidationCode(@RequestBody PersonRecoveryPasswordDTO recoveryPasswordDTO){
        return personService.sendValidationCode(recoveryPasswordDTO.getEmail());
    }
    

    @PostMapping
    public Person create(@Valid @RequestBody Person person){
        return personService.create(person);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person){
        return personService.update(person);
    }
    
}
