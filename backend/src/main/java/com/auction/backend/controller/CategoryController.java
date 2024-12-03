package com.auction.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.backend.model.Category;
import com.auction.backend.model.Person;
import com.auction.backend.repository.PersonRepository;
import com.auction.backend.services.CategoryService;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PersonRepository personRepository;

    @PostMapping
    public Category create(@RequestBody Category category, Principal principal) {
        Person person = personRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("Email not found"));
        return categoryService.create(category, person);
    }

    @PutMapping
    public Category update(@RequestBody Category category) {
        return categoryService.update(category);
    }

    @GetMapping
    public List<Category> listAll() {
        return categoryService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }
}