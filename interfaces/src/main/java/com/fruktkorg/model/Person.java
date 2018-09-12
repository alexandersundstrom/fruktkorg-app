package com.fruktkorg.model;

import java.util.List;

public class Person {

    private String personNummer;
    private String name;
    private List<Access> access;

    public Person(String personNummer, String name, List<Access> access) {
        this.personNummer = personNummer;
        this.name = name;
        this.access = access;
    }

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

    public List<Access> getAccess() {
        return access;
    }

    public void setAccess(List<Access> access) {
        this.access = access;
    }
}
