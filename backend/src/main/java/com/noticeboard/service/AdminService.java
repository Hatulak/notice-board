package com.noticeboard.service;

import com.noticeboard.model.RoleName;
import com.noticeboard.model.User;
import com.noticeboard.repositories.NoticeRepository;
import com.noticeboard.repositories.RoleRepository;
import com.noticeboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final NoticeRepository noticeRepository;

    @Autowired
    public AdminService(UserRepository userRepository, RoleRepository roleRepository, NoticeRepository noticeRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.noticeRepository = noticeRepository;
    }

    public User changeUserRole(Long userId, RoleName newRoleName) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setRoles(Stream.of(roleRepository.findByName(newRoleName))
                    .collect(Collectors.toSet()));
            return userRepository.save(user);
        } else throw new EntityNotFoundException("No user with id: " + userId);
    }

    public void deleteUser(Long userId) {
        noticeRepository.deleteAllByOwner_Id(userId);
        userRepository.deleteById(userId);
    }
}
