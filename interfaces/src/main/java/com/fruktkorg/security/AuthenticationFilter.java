package com.fruktkorg.security;

import com.fruktkorg.model.Person;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class AuthenticationFilter extends OncePerRequestFilter {
    private static final String PERSON_NUMBER_HEADER = "X_PERSONR";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Person john = new Person("198803011234", "John Doe", Arrays.asList("admin", "sök"));
        Person jane = new Person("199008011234", "Jane Doe", Collections.singletonList("sök"));

        List<Person> persons = Arrays.asList(john, jane);

        String personNumber = request.getHeader(PERSON_NUMBER_HEADER);
        if (personNumber == null) {
            throw new SecurityException("X_PERSONR Was missing in Header");
        }

        Person loggedInUser = null;
        for (Person person : persons) {
            if (person.getPersonNummer().equals(personNumber)) {
                loggedInUser = person;
            }
        }
        if (loggedInUser == null) {
            throw new SecurityException("Person was not found");
        }

        Authentication auth = new AuthenticationToken(loggedInUser);
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}
