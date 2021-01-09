package com.noticeboard.service;

import com.noticeboard.model.Category;
import com.noticeboard.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.MethodNotAllowedException;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category save(Category category) {
        return categoryRepository.saveAndFlush(category);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(Long id) {
        Optional<Category> categoryById = categoryRepository.findById(id);
        if (categoryById.isPresent()) return categoryById.get();
        else throw new EntityNotFoundException("There is no category with id: " + id);
    }

    public void deleteById(Long id) {
        Category category = categoryRepository.getOne(id);
        if (category.getNoticeList().isEmpty())
            categoryRepository.deleteById(id);
        else throw new RuntimeException("Cannot delete category that has notices");
    }
}
