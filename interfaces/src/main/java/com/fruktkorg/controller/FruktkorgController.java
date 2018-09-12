package com.fruktkorg.controller;

import com.fruktkorg.model.Frukt;
import com.fruktkorg.model.Fruktkorg;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("fruktkorg")
public class FruktkorgController {

    @GetMapping()
    public List<Fruktkorg> findAll() {
        //TODO ADD validation for rights according to list on person object
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Person person = (Person) auth.getPrincipal();

        Fruktkorg hallen = new Fruktkorg();
        hallen.setId(1);
        hallen.setName("Hallen");
        hallen.setLastChanged(Instant.now());

        Fruktkorg fikaRummet = new Fruktkorg();
        fikaRummet.setId(2);
        fikaRummet.setName("Fikarummet");
        fikaRummet.setLastChanged(Instant.now());
        return Arrays.asList(hallen, fikaRummet);
    }

    @GetMapping("/{id}")
    public Fruktkorg findById(@PathVariable int id) {
        Fruktkorg fruktkorg = new Fruktkorg();
        fruktkorg.setId(id);
        fruktkorg.setName("Fruktkorg");
        fruktkorg.setLastChanged(Instant.now());
        return fruktkorg;
    }

    @GetMapping("/frukt/{type}")
    public List<Fruktkorg> findByFrukt(@PathVariable String type) {
        Fruktkorg fruktkorg = new Fruktkorg();
        fruktkorg.setId(1);
        fruktkorg.setName("Hallen");
        fruktkorg.setLastChanged(Instant.now());
        Frukt fromVariable = new Frukt(type, 3, fruktkorg);
        fruktkorg.setFruktList(Collections.singletonList(fromVariable));
        return Collections.singletonList(fruktkorg);
    }

}
