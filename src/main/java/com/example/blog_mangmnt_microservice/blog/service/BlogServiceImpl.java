package com.example.blog_mangmnt_microservice.blog.service;



import com.example.blog_mangmnt_microservice.blog.exception.ResourceNotFoundException;
import com.example.blog_mangmnt_microservice.blog.model.Blog;
import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.repository.BlogRepository;
import com.example.blog_mangmnt_microservice.blog.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;


    @Override
    public Blog createBlog(Blog blog) {
        blog.setCreatedAt(LocalDateTime.now());
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
    }



    @Override
    public Page<Blog> getAllBlogs(int page, int size, String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        if (searchTerm != null && !searchTerm.isEmpty()) {

            return blogRepository.findByTitleContainingIgnoreCase(searchTerm, pageable);
        } else {
            return blogRepository.findAll(pageable);
        }
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }


    @Override
    public Blog updateBlog(Long id, Blog blogDetails) {
        Blog blog = getBlogById(id);
        blog.setTitle(blogDetails.getTitle());
        blog.setContent(blogDetails.getContent());
        blog.setAuthor(blogDetails.getAuthor());
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }
    @Override
    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);

        // Delete all comments associated with this blog first
        commentRepository.deleteAll(commentRepository.findByBlogId(id));

        // Now delete the blog
        blogRepository.delete(blog);
    }



}