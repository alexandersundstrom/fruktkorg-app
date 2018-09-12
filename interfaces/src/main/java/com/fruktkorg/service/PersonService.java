package com.fruktkorg.service;

import com.fruktkorg.common.exception.PersonMissingException;
import com.fruktkorg.common.model.Permission;
import com.fruktkorg.common.model.Person;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PersonService {
    private static List<Person> persons = Arrays.asList(
            new Person("198803011234", "John Doe", Arrays.asList(Permission.SEARCH)),
            new Person("199008011234", "Jane Doe", new ArrayList<>())
    );

    public Person getPerson(String personNumber) throws PersonMissingException {
        return persons
                .stream()
                .filter(person -> person.getPersonNummer().equals(personNumber))
                .findFirst()
                .orElseThrow(() -> new PersonMissingException("Unable to find person with person number: " + personNumber, personNumber));
    }
}
