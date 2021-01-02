package com.noticeboard.model.dtos;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.User;

public class Mapper {

    public static Notice mapToEntity(NoticeDTO noticeDTO, Category category, User user) {
        return Notice.builder().title(noticeDTO.getTitle()).description(noticeDTO.getDescription()).price(noticeDTO.getPrice()).owner(user).category(category).build();
    }
}
