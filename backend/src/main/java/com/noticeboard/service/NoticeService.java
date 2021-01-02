package com.noticeboard.service;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.User;
import com.noticeboard.model.dtos.Mapper;
import com.noticeboard.model.dtos.NoticeDTO;
import com.noticeboard.repositories.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    private final CategoryService categoryService;

    private final JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository, CategoryService categoryService, JwtUserDetailsService jwtUserDetailsService) {
        this.noticeRepository = noticeRepository;
        this.categoryService = categoryService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    public Notice createNotice(NoticeDTO noticeDTO, String username) {
        Category category = categoryService.getById(noticeDTO.getCategoryId());
        User user = jwtUserDetailsService.getUserEntityByUsername(username);

        Notice notice = Mapper.mapToEntity(noticeDTO, category, user);

        return noticeRepository.save(notice);
    }


    public Notice save(Notice notice) {
        return noticeRepository.save(notice);
    }

    public void deleteById(Long id) {
        noticeRepository.deleteById(id);
    }

    public List<Notice> getAll() {
        return noticeRepository.findAll();
    }

    public Notice getById(Long id) {
        Optional<Notice> noticeById = noticeRepository.findById(id);
        if (noticeById.isPresent()) return noticeById.get();
        else throw new EntityNotFoundException("There is no notice with id: " + id);
    }

    public Notice update(NoticeDTO noticeDTO, String username) {
        return createNotice(noticeDTO,username);
    }
}
