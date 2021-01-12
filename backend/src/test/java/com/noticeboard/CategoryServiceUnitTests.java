package com.noticeboard;


import com.noticeboard.model.Category;
import com.noticeboard.model.Notice;
import com.noticeboard.repositories.CategoryRepository;
import com.noticeboard.service.CategoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceUnitTests {

    @Mock
    private CategoryRepository categoryRepository;

    private CategoryService categoryService;


    @BeforeEach
    public void setUp() {
        categoryService = new CategoryService(categoryRepository);
    }

    @Test
    public void categoryService_getAll() {
        Mockito.when(categoryRepository.findAll()).thenReturn(Arrays.asList(
                new Category(1L, "cat1", null),
                new Category(2L, "cat2", null)));

        List<Category> all = categoryService.getAll();

        Assertions.assertEquals(2, all.size());
    }

    @Test
    public void categoryService_getById() {
        Mockito.when(categoryRepository.findById(1L)).thenReturn(
                Optional.of(new Category(1L, "cat1", null)));

        Category byId = categoryService.getById(1L);
        Assertions.assertEquals(1L, byId.getId());
        Assertions.assertEquals("cat1", byId.getName());
        Assertions.assertNull(byId.getNoticeList());
    }

    @Test
    public void categoryService_getById_NoEntity() {
        Mockito.when(categoryRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException entityNotFoundException = Assertions.assertThrows(EntityNotFoundException.class, () -> {
            categoryService.getById(1L);
        });

        String exceptionMessage = entityNotFoundException.getMessage();
        Assertions.assertEquals("There is no category with id: 1", exceptionMessage);
    }

    @Test
    public void categoryService_save() {
        Mockito.when(categoryRepository.saveAndFlush(Mockito.any(Category.class)))
                .thenReturn(Category.builder().id(1L).name("cat").build());

        Category categoryReturned = categoryService.save(new Category(1L, "cat", null));

        Assertions.assertEquals(1L, categoryReturned.getId());
        Assertions.assertEquals("cat", categoryReturned.getName());
        Assertions.assertNull(categoryReturned.getNoticeList());
    }

    @Test
    public void categoryService_deleteById_notEmptyNoticesList() {
        Mockito.when(categoryRepository.getOne(1L)).thenReturn(
                new Category(1L, "cat1", new HashSet<>(Collections.singleton(new Notice()))));

        RuntimeException runtimeException = Assertions.assertThrows(RuntimeException.class, () -> {
            categoryService.deleteById(1L);
        });
        String exceptionMessage = runtimeException.getMessage();
        Assertions.assertEquals("Cannot delete category that has notices", exceptionMessage);
    }

    @Test
    public void categoryService_deleteById_emptyNoticesList() {
        Mockito.when(categoryRepository.getOne(1L)).thenReturn(
                new Category(1L, "cat1", new HashSet<>()));

        categoryService.deleteById(1L);

        Mockito.verify(categoryRepository,Mockito.times(1)).deleteById(1L);
    }

}
