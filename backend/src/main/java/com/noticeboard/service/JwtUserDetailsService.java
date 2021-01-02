package com.noticeboard.service;

import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import com.noticeboard.model.User;
import com.noticeboard.repositories.RoleRepository;
import com.noticeboard.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder bcryptEncoder;

    private final RoleRepository roleRepository;

    public JwtUserDetailsService(UserRepository userRepository, PasswordEncoder bcryptEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.bcryptEncoder = bcryptEncoder;
        this.roleRepository = roleRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.get().getUsername(),
                user.get().getPassword(),
                true,
                true,
                true,
                true,
                getAuthorities(user.get()));
    }

    public User getUserEntityByUsername(String username){
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user.get();
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName().toString()));
        });
        return authorities;
    }

    public User registerUser(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setRoles(Stream.of(roleRepository.findByName(RoleName.USER))
                .collect(Collectors.toSet()));
        return userRepository.save(newUser);
    }
}
