package com.fruktkorg;

import com.fruktkorg.security.AuthenticationFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.servlet.Filter;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean(name = "authenticationFilter")
    public Filter getAuthenticationFilter() {
        return new AuthenticationFilter();
    }
}
