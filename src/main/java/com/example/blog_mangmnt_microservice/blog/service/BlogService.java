package com.example.blog_mangmnt_microservice.blog.service;


import com.example.blog_mangmnt_microservice.blog.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BlogService {
    Blog createBlog(Blog blog);
    Blog getBlogById(Long id);


    Page<Blog> getAllBlogs(Pageable pageable);

    Blog updateBlog(Long id, Blog blog);
    void deleteBlog(Long id);
}
