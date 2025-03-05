package com.example.blog_mangmnt_microservice.blog.service;


import com.example.blog_mangmnt_microservice.blog.model.Blog;
import com.example.blog_mangmnt_microservice.blog.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BlogService {
    Blog createBlog(Blog blog);
    Blog getBlogById(Long id);


    List<Blog> getAllBlogs();

    Page<Blog> getAllBlogs(int page, int size, String searchTerm);

    Blog updateBlog(Long id, Blog blog);
    void deleteBlog(Long id);

}
