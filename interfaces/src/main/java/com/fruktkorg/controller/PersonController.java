package com.fruktkorg.controller;

import com.fruktkorg.common.PersonUtil;
import com.fruktkorg.common.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("loggedInPerson")
public class PersonController {

    @GetMapping
    public Person getLoggedInUser() {
        return PersonUtil.getLoggedInPerson();
    }
}
