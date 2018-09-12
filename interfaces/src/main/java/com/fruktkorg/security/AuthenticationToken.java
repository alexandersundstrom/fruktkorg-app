package com.fruktkorg.security;

import com.fruktkorg.model.Person;
import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Arrays;

public class AuthenticationToken extends AbstractAuthenticationToken {

    private Person authenticatedUser;

    public AuthenticationToken(Person authenticatedUser) {
        super(Arrays.asList());
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
