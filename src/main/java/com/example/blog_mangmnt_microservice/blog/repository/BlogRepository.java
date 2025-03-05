package com.example.blog_mangmnt_microservice.blog.repository;



import com.example.blog_mangmnt_microservice.blog.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {


    Page<Blog> findAll(Pageable pageable);

    Page<Blog> findByTitleContainingIgnoreCase(String searchTerm, Pageable pageable);
}


