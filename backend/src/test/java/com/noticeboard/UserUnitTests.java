package com.noticeboard;

import com.noticeboard.model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public class UserUnitTests {

    @Test
    public void user_builder_test() {
        User user = User.builder()
                .id(1L)
                .email("email@email.com")
                .password("abcd")
                .username("username")
                .roles(Collections.singleton(new Role()))
                .noticeList(Collections.singleton(new Notice()))
                .build();

        Assertions.assertEquals(1L,user.getId());
        Assertions.assertEquals("email@email.com",user.getEmail());
        Assertions.assertEquals("abcd",user.getPassword());
        Assertions.assertEquals("username",user.getUsername());
        Assertions.assertEquals(1,user.getRoles().size());
        Assertions.assertEquals(1,user.getNoticeList().size());
    }

    @Test
    public void user_setters_test() {
        User user = new User();
        user.setId(1L);
        user.setPassword("1234");
        user.setUsername("username");
        user.setEmail("email@email.com");
        user.setRoles(Collections.singleton(new Role()));
        user.setNoticeList(Collections.singleton(new Notice()));

        Assertions.assertEquals(1L,user.getId());
        Assertions.assertEquals("email@email.com",user.getEmail());
        Assertions.assertEquals("1234",user.getPassword());
        Assertions.assertEquals("username",user.getUsername());
        Assertions.assertEquals(1,user.getRoles().size());
        Assertions.assertEquals(1,user.getNoticeList().size());
    }

}
