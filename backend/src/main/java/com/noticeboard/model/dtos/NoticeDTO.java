package com.noticeboard.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class NoticeDTO {
    private Long id;
    private String title;
    private BigInteger price; //Prize in polish grosz: 100 groszy - 1 PLN
    private String description;
    private Long categoryId;
}
