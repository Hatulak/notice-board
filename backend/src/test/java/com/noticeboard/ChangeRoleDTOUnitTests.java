package com.noticeboard;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import com.noticeboard.model.dtos.ChangeRoleDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public class ChangeRoleDTOUnitTests {
    @Test
    public void category_builder_test() {
        ChangeRoleDTO changeRoleDTO = ChangeRoleDTO.builder()
                .newRoleName(RoleName.ADMIN)
                .userId(1L)
                .build();

        Assertions.assertEquals(1L, changeRoleDTO.getUserId());
        Assertions.assertEquals(RoleName.ADMIN, changeRoleDTO.getNewRoleName());
    }

    @Test
    public void category_setters_test() {
        ChangeRoleDTO changeRoleDTO = new ChangeRoleDTO();
        changeRoleDTO.setUserId(1L);
        changeRoleDTO.setNewRoleName(RoleName.USER);

        Assertions.assertEquals(1L, changeRoleDTO.getUserId());
        Assertions.assertEquals(RoleName.USER, changeRoleDTO.getNewRoleName());
    }
}
