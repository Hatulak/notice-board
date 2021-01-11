package com.noticeboard;

import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import com.noticeboard.model.User;
import com.noticeboard.repositories.RoleRepository;
import com.noticeboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class DBRunner implements CommandLineRunner {

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @Autowired
    public DBRunner(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Role> all = roleRepository.findAll();
        if (all.size() != 2) {
            Role userRole = Role.builder().name(RoleName.USER).build();
            Role adminRole = Role.builder().name(RoleName.ADMIN).build();
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
        }

        if(userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .email("admin@admin.com")
                    .roles(Collections.singleton(roleRepository.findByName(RoleName.ADMIN))).build();
            userRepository.save(admin);
        }

    }
}
