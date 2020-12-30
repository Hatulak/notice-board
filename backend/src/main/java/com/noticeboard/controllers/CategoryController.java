package com.noticeboard.controllers;

import com.noticeboard.model.Category;
import com.noticeboard.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/category")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category){
        return categoryService.save(category);
    }

    @PutMapping
    public Category updateCategory(@RequestBody Category category) {
        return categoryService.save(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteById(id);
    }

    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.getAll();
    }

    @GetMapping(value = "/{id}")
    public Category getCategory(@PathVariable Long id){
        return categoryService.getById(id);
    }

}
