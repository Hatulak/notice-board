package com.noticeboard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.noticeboard.config.security.JwtRequest;
import com.noticeboard.config.security.JwtResponse;
import com.noticeboard.controllers.CategoryController;
import com.noticeboard.model.Category;
import com.noticeboard.repositories.CategoryRepository;
import org.aspectj.weaver.patterns.IToken;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.postgresql.core.ResultHandlerBase;
import org.postgresql.core.ResultHandlerDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
public class CategoryControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void saveCategory() throws Exception {
        JwtRequest jwtRequest = new JwtRequest("admin", "admin");
        String body = objectMapper.valueToTree(jwtRequest).toString();
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
                .post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").isNotEmpty())
                .andReturn();
        JwtResponse jwtResponse = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), JwtResponse.class);
        String token = jwtResponse.getToken();

        Category category = Category.builder().name("TestCategoryController").build();
        String categoryBody = objectMapper.valueToTree(category).toString();
        mockMvc.perform(MockMvcRequestBuilders
                .post("/category")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(categoryBody))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty());
    }

    @Test
    public void getCategory() throws Exception {
        Category category = categoryRepository.findAll().get(0);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/category/{id}",category.getId())
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(category.getId()));
    }

    @Test
    public void getCategoryWithWrongID_expectBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/category/{id}",-1)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
