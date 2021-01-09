package com.noticeboard.model.dtos;

import com.noticeboard.model.RoleName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChangeRoleDTO {
    private Long userId;
    private RoleName newRoleName;
}
