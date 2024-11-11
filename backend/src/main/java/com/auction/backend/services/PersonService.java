package com.auction.backend.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.auction.backend.model.Person;
import com.auction.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findbyEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Person create(Person Person){
        Person personCreated = personRepository.save(Person);
        Context context = new Context();
        context.setVariable("name", personCreated.getName());
        try {
            emailService.sendTemplateEmail(personCreated.getEmail(), "Cadastro realizado com sucesso", context, "emailWelcome");
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return personCreated;
    }

    public Person update(Person Person){
        Person savedPerson = personRepository.findById(Person.getId()).orElseThrow(() -> new NoSuchElementException("Person not found"));
        savedPerson.setName(Person.getName());
        savedPerson.setEmail(Person.getEmail());
        return personRepository.save(savedPerson);
    }

}
