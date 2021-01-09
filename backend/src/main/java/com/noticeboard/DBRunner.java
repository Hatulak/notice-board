package com.noticeboard;

import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import com.noticeboard.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DBRunner implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Autowired
    public DBRunner(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Role> all = roleRepository.findAll();
        if (all.size() == 2) return;
        else {
            Role userRole = Role.builder().name(RoleName.USER).build();
            Role adminRole = Role.builder().name(RoleName.ADMIN).build();
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
        }

    }
}
