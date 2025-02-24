package com.example.blog_mangmnt_microservice.blog.repository;

import com.example.blog_mangmnt_microservice.blog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
