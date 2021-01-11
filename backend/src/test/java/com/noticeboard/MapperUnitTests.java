package com.noticeboard;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.User;
import com.noticeboard.model.dtos.Mapper;
import com.noticeboard.model.dtos.NoticeDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MapperUnitTests {

    @Test
    public void map_to_entity_test() {
        Notice notice = Mapper.mapToEntity(new NoticeDTO(1L, "title", 1F, "desc", null), new Category(), new User());
        Assertions.assertEquals(1L, notice.getId());
        Assertions.assertEquals("title", notice.getTitle());
        Assertions.assertEquals("desc", notice.getDescription());
        Assertions.assertEquals(1F, notice.getPrice());
        Assertions.assertNotNull(notice.getCategory());
        Assertions.assertNotNull(notice.getOwner());
    }

    @Test
    public void map_to_dto_test() {
        NoticeDTO noticeDTO = Mapper.mapToDTO(Notice.builder()
                .id(1L)
                .price(1F)
                .title("title")
                .owner(User.builder()
                        .id(1L)
                        .build())
                .description("desc")
                .category(Category.builder()
                        .id(1L)
                        .build()).build());
        Assertions.assertEquals(1L, noticeDTO.getId());
        Assertions.assertEquals("title", noticeDTO.getTitle());
        Assertions.assertEquals("desc", noticeDTO.getDescription());
        Assertions.assertEquals(1F, noticeDTO.getPrice());
        Assertions.assertNotNull(noticeDTO.getCategoryId());
    }
}
