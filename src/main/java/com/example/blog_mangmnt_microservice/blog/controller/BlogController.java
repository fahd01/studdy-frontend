package com.example.blog_mangmnt_microservice.blog.controller;



import com.example.blog_mangmnt_microservice.blog.model.Blog;
import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.model.CreateComment;
import com.example.blog_mangmnt_microservice.blog.service.BlogService;
import com.example.blog_mangmnt_microservice.blog.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogController {

    @Autowired
    private BlogService blogService;



    @PostMapping
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog) {
        return new ResponseEntity<>(blogService.createBlog(blog), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @GetMapping
    public ResponseEntity<Page<Blog>> getAllBlogs(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "6") int size,
                                                  @RequestParam(required = false) String searchTerm) {
        Page<Blog> blogs = blogService.getAllBlogs(page, size, searchTerm);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @Valid @RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.updateBlog(id, blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }


}