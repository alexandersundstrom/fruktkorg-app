package com.fruktkorg.security;

import com.fruktkorg.common.model.Person;
import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.ArrayList;

public class AuthenticationToken extends AbstractAuthenticationToken {

    private Person authenticatedUser;

    public AuthenticationToken(Person authenticatedUser) {
        super(new ArrayList<>());
        this.authenticatedUser = authenticatedUser;
    }

    @Override
    public Object getCredentials() {
        return authenticatedUser;
    }

    @Override
    public Object getPrincipal() {
        return authenticatedUser;
    }
}
