package com.auction.backend.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.auction.backend.exception.DuplicateFieldException;
import com.auction.backend.model.Person;
import com.auction.backend.model.PersonRecoveryPasswordDTO;
import com.auction.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService implements UserDetailsService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 5;
    private static final SecureRandom RANDOM = new SecureRandom();


    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private String generateRandomCode() {
        String code;
        do {
            StringBuilder codeBuilder = new StringBuilder(CODE_LENGTH);
            for (int i = 0; i < CODE_LENGTH; i++) {
                codeBuilder.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
            }
            code = codeBuilder.toString();
        } while (personRepository.existsByValidationCode(code));
        return code;
    }

    public Person create(Person Person){
        Person.setEmailValidationCode(generateRandomCode());
        Person personCreated;
        try{
        personCreated = personRepository.save(Person);
        } catch (DataIntegrityViolationException ex) {
            String message = ex.getMessage();
            if (Pattern.compile("\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}").matcher(message).find()) {
                throw new DuplicateFieldException("CPF already registered.");
            } else if (Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").matcher(message).find()) {
                throw new DuplicateFieldException("Email already registered.");
            } else {
                throw new DuplicateFieldException("Error creating person.");
            }
        }
        Context context = new Context();
        context.setVariable("name", personCreated.getName());
        context.setVariable("link", "http://localhost:3000/email-validation/" + personCreated.getEmail() + "/" + personCreated.getEmailValidationCode());
        context.setVariable("year", LocalDateTime.now().getYear());
        try {
            emailService.sendTemplateEmail(personCreated.getEmail(), "Cadastro realizado com sucesso", context, "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return personCreated;
    }

    public Person update(Person Person){
        Person savedPerson = personRepository.findById(Person.getId()).orElseThrow(() -> new NoSuchElementException("Email not found"));
        savedPerson.setName(Person.getName());
        savedPerson.setEmail(Person.getEmail());
        return personRepository.save(savedPerson);
    }

    public String sendValidationCode(String email) {
        Person person = personRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Email not found"));
        Context context = new Context();
        String validationCode = generateRandomCode();
        person.setValidationCode(validationCode);
        person.setValidationCodeValidity(LocalDateTime.now().plusMinutes(5));
        personRepository.save(person);
        context.setVariable("name", person.getName());
        context.setVariable("validationCode",validationCode);
        context.setVariable("year", LocalDateTime.now().getYear());
        try {
            emailService.sendTemplateEmail(person.getEmail(), "Código de validação", context, "emailValidationCode");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return validationCode;

    }

    public boolean emailValidation(String email, String emailValidationCode) {
        Person person = personRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Email not found"));
        if (emailValidationCode.equals(person.getEmailValidationCode())) {
            person.setActive(true);
            person.setEmailValidationCode(null);
            personRepository.save(person);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid email validation code");
        }
    }

    
    public boolean recoveryPassword (PersonRecoveryPasswordDTO personRecoveryPasswordDTO) {
        Person person = personRepository.findByEmail(personRecoveryPasswordDTO.getEmail()).orElseThrow(() -> new NoSuchElementException("Email not found"));

        if (personRecoveryPasswordDTO.getValidationCode().equals(person.getValidationCode()) && person.getValidationCodeValidity().isAfter(LocalDateTime.now())) {
            person.setPassword(personRecoveryPasswordDTO.getNewPassword());
            person.setValidationCode(null);
            person.setValidationCodeValidity(null);
            personRepository.save(person);
            return true;
        } else {
            throw new IllegalArgumentException("Invalid validation code");
        }
    }

}
