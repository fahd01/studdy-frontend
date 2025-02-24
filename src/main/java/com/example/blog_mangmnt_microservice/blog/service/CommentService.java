package com.example.blog_mangmnt_microservice.blog.service;

import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.model.CreateComment;
import com.example.blog_mangmnt_microservice.blog.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(CreateComment createComment) {
        Comment comment = new Comment();
        comment.setContent(createComment.getContent());
        comment.setBlogId(createComment.getBlogId());
        comment.setUserId(createComment.getUserId());
        return commentRepository.save(comment);
    }
}
