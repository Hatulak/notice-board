package com.noticeboard;

import com.noticeboard.model.RoleName;
import com.noticeboard.model.dtos.ChangeRoleDTO;
import com.noticeboard.model.dtos.NoticeDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class NoticeDTOUnitTests {
    @Test
    public void category_builder_test() {
        NoticeDTO noticeDTO = NoticeDTO.builder()
                .id(1L)
                .title("title")
                .categoryId(1L)
                .description("desc")
                .price(1.0F)
                .build();

        Assertions.assertEquals(1L, noticeDTO.getId());
        Assertions.assertEquals("title", noticeDTO.getTitle());
        Assertions.assertEquals(1L,noticeDTO.getCategoryId());
        Assertions.assertEquals("desc",noticeDTO.getDescription());
        Assertions.assertEquals(1.0F,noticeDTO.getPrice());
    }

    @Test
    public void category_setters_test() {
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setId(1L);
        noticeDTO.setTitle("title");
        noticeDTO.setCategoryId(1L);
        noticeDTO.setDescription("desc");
        noticeDTO.setPrice(1.0F);

        Assertions.assertEquals(1L, noticeDTO.getId());
        Assertions.assertEquals("title", noticeDTO.getTitle());
        Assertions.assertEquals(1L,noticeDTO.getCategoryId());
        Assertions.assertEquals("desc",noticeDTO.getDescription());
        Assertions.assertEquals(1.0F,noticeDTO.getPrice());
    }
}
