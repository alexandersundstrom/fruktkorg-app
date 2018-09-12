package com.fruktkorg.common;

import com.fruktkorg.common.exception.AccessMissingException;
import com.fruktkorg.common.model.Permission;
import com.fruktkorg.common.model.Person;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class PersonUtil {

    public static Person getLoggedInPerson() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (Person) auth.getPrincipal();
    }

    public static void validatePermissionForLoggedInUser(Permission permission) throws AccessMissingException {
        Person loggedInPerson = getLoggedInPerson();
        if (!loggedInPerson.hasPermission(permission)) {
            throw new AccessMissingException("Person was missing the right permission: " + permission.name());
        }
    }
}
