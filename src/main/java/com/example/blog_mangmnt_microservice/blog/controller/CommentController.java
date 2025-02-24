package com.example.blog_mangmnt_microservice.blog.controller;

import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.model.CreateComment;
import com.example.blog_mangmnt_microservice.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody CreateComment createComment) {
        return commentService.createComment(createComment);
    }
}