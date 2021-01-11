package com.noticeboard;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.Role;
import com.noticeboard.model.User;
import net.bytebuddy.description.modifier.Ownership;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public class NoticeUnitTests {

    @Test
    public void notice_builder_test() {
        Notice notice = Notice.builder()
                .id(1L)
                .description("desc")
                .category(new Category())
                .owner(new User())
                .title("title")
                .price(123.13F)
                .build();

        Assertions.assertEquals(1L, notice.getId());
        Assertions.assertEquals("title", notice.getTitle());
        Assertions.assertEquals("desc", notice.getDescription());
        Assertions.assertEquals(123.13F, notice.getPrice());
        Assertions.assertNotNull(notice.getOwner());
        Assertions.assertNotNull(notice.getCategory());

    }

    @Test
    public void notice_setters_test() {
        Notice notice = new Notice();
        notice.setId(1L);
        notice.setCategory(new Category());
        notice.setOwner(new User());
        notice.setDescription("desc");
        notice.setPrice(123.13F);
        notice.setTitle("title");

        Assertions.assertEquals(1L, notice.getId());
        Assertions.assertEquals("title", notice.getTitle());
        Assertions.assertEquals("desc", notice.getDescription());
        Assertions.assertEquals(123.13F, notice.getPrice());
        Assertions.assertNotNull(notice.getOwner());
        Assertions.assertNotNull(notice.getCategory());
    }
}
