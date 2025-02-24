package com.example.blog_mangmnt_microservice.blog.repository;

import com.example.blog_mangmnt_microservice.blog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
