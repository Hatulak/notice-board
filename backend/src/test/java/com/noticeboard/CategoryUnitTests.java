package com.noticeboard;

import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.model.Role;
import com.noticeboard.model.RoleName;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public class CategoryUnitTests {

    @Test
    public void category_builder_test() {
        Category category = Category.builder()
                .id(1L)
                .name("cat")
                .noticeList(Collections.singleton(new Notice()))
                .build();

        Assertions.assertEquals(1L, category.getId());
        Assertions.assertEquals("cat", category.getName());
        Assertions.assertEquals(1,category.getNoticeList().size());
    }

    @Test
    public void category_setters_test() {
        Category category = new Category();
        category.setId(1L);
        category.setName("test");
        category.setNoticeList(Collections.singleton(new Notice()));

        Assertions.assertEquals(1L, category.getId());
        Assertions.assertEquals("test", category.getName());
        Assertions.assertEquals(1,category.getNoticeList().size());
    }
}
