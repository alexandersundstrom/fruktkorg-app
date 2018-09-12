package com.fruktkorg.common.model;

import java.util.List;

public class Person {

    private String personNummer;
    private String name;
    private List<Permission> permissions;

    public Person(String personNummer, String name, List<Permission> permissions) {
        this.personNummer = personNummer;
        this.name = name;
        this.permissions = permissions;
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

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public boolean hasPermission(Permission neededPermission) {
        return permissions.contains(neededPermission);
    }
}
