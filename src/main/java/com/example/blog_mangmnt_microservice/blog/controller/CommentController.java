package com.example.blog_mangmnt_microservice.blog.controller;

import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.model.CreateComment;
import com.example.blog_mangmnt_microservice.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // ✅ New method to fetch comments by blogId
    @GetMapping("/blogs/{blogId}")
    public List<Comment> getCommentsByBlogId(@PathVariable Long blogId) {
        return commentService.getCommentsByBlogId(blogId);
    }

    // ✅ New method to fetch all comments
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @PostMapping("/{commentId}/like")
    public Comment likeComment(@PathVariable Long commentId, @RequestParam Long userId) {
        return commentService.likeComment(commentId, userId);
    }

    @PostMapping("/{commentId}/dislike")
    public Comment dislikeComment(@PathVariable Long commentId, @RequestParam Long userId) {
        return commentService.dislikeComment(commentId, userId);
    }
}