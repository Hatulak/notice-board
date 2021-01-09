package com.noticeboard.controllers;

import com.noticeboard.model.User;
import com.noticeboard.model.dtos.ChangeRoleDTO;
import com.noticeboard.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RequestMapping("/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PutMapping("/user")
    public User changeRole(@RequestBody ChangeRoleDTO changeRoleDTO){
        return adminService.changeUserRole(changeRoleDTO.getUserId(), changeRoleDTO.getNewRoleName());
    }

    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable Long userId){
        adminService.deleteUser(userId);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return adminService.getAllUsers();
    }
}
