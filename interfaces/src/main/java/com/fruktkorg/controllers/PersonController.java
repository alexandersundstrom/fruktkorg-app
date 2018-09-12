package com.fruktkorg.controllers;

import com.fruktkorg.model.Person;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("loggedInPerson")
public class PersonController {

    @GetMapping
    public Person getLoggedInUser() {
       Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       return (Person) auth.getPrincipal();
    }
}
