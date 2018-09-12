package com.fruktkorg.service;

import com.fruktkorg.exception.PersonMissingException;
import com.fruktkorg.model.Person;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class PersonService {
    private static List<Person> persons = Arrays.asList(
        new Person("198803011234", "John Doe", Arrays.asList("admin", "sök")),
        new Person("199008011234", "Jane Doe", Collections.singletonList("sök"))
    );

    public Person getPerson(String personNumber) throws PersonMissingException {
        return persons
            .stream()
            .filter(person -> person.getPersonNummer().equals(personNumber))
            .findFirst()
            .orElseThrow(() -> new PersonMissingException("Unable to find person with person number: " + personNumber, personNumber));
    }
}
