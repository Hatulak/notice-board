package com.noticeboard.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Category {
    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "category")
    private Set<Notice> noticeList;
}
