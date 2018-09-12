package com.fruktkorg.model;

import java.util.List;

public class Person {

    private String personNummer;
    private String name;
    private List<String> access;

    public String getPersonNummer() {
        return personNummer;
    }

    public void setPersonNummer(String personNummer) {
        this.personNummer = personNummer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getAccess() {
        return access;
    }

    public void setAccess(List<String> access) {
        this.access = access;
    }

    public Person(String personNummer, String name, List<String> access) {
        this.personNummer = personNummer;
        this.name = name;
        this.access = access;
    }
}
