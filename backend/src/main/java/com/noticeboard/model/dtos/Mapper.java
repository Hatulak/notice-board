package com.noticeboard.model.dtos;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.User;

public class Mapper {

    public static Notice mapToEntity(NoticeDTO noticeDTO, Category category, User user) {
        return Notice.builder().id(noticeDTO.getId()).title(noticeDTO.getTitle()).description(noticeDTO.getDescription()).price(noticeDTO.getPrice()).owner(user).category(category).build();
    }

    public static NoticeDTO mapToDTO(Notice notice) {
        return NoticeDTO.builder().id(notice.getId()).description(notice.getDescription()).categoryId(notice.getCategory().getId()).price(notice.getPrice()).title(notice.getTitle()).build();
    }
}
