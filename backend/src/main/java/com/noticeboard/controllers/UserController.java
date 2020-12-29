package com.noticeboard.controllers;

import com.noticeboard.model.User;
import com.noticeboard.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class UserController {

    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    public UserController(JwtUserDetailsService jwtUserDetailsService) {
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @PostMapping(value = "/register")
    public User registerUser(@RequestBody User user) {
        return jwtUserDetailsService.registerUser(user);
    }

}
