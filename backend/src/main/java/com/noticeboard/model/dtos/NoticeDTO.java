package com.noticeboard.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class NoticeDTO {
    private String title;
    private BigDecimal price; //Prize in polish grosz: 100 groszy - 1 PLN
    private String description;
    private Long categoryId;
}
