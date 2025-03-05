package com.example.blog_mangmnt_microservice.blog.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateComment {

    @NotBlank
    private String content;

    private Long blogId;

    private Long userId;

    private LocalDateTime createdAt;

    private String username;


}
