package com.example.blog_mangmnt_microservice.blog.service;

import com.example.blog_mangmnt_microservice.blog.model.User;
import com.example.blog_mangmnt_microservice.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
