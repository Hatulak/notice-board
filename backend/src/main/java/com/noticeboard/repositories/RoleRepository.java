package com.noticeboard.repositories;

import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(RoleName name);
}
