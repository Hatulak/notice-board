package com.noticeboard;

import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RoleUnitTests {

    @Test
    public void role_builder_test() {
        Role role = Role.builder().id(1L).name(RoleName.ADMIN).build();

        Assertions.assertEquals(1L, role.getId());
        Assertions.assertEquals(RoleName.ADMIN, role.getName());
    }

    @Test
    public void role_setters_test() {
        Role role = new Role();
        role.setId(1L);
        role.setName(RoleName.USER);

        Assertions.assertEquals(1L, role.getId());
        Assertions.assertEquals(RoleName.USER, role.getName());
    }
}
