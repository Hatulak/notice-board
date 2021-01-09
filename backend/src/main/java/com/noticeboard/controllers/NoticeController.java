package com.noticeboard.controllers;

import com.noticeboard.aspects.LogExecution;
import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.dtos.NoticeDTO;
import com.noticeboard.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequestMapping("/notice")
@RestController
@LogExecution
public class NoticeController {

    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public Notice createNotice(@RequestBody NoticeDTO notice, Principal principal){
        String ownerUsername = principal.getName();
        return noticeService.createNotice(notice, ownerUsername);
    }

    @PutMapping
    public Notice updateNotice(@RequestBody NoticeDTO notice, Principal principal) {
        String ownerUsername = principal.getName();
        return noticeService.update(notice, ownerUsername);
    }

    @DeleteMapping("/{id}")
    public void deleteNotice(@PathVariable Long id){
        noticeService.deleteById(id);
    }

    @GetMapping
    public List<Notice> getAllNotices(){
        return noticeService.getAll();
    }

    @GetMapping(value = "/{id}")
    public Notice getNotice(@PathVariable Long id){
        return noticeService.getById(id);
    }

    @GetMapping(value = "/user/{username}")
    public List<Notice> getUserNotices(@PathVariable String username){
        return noticeService.getUserNotices(username);
    }


}
