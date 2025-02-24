package com.example.blog_mangmnt_microservice;





import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.blog_mangmnt_microservice.blog.model")
@EnableJpaRepositories(basePackages = "com.example.blog_mangmnt_microservice.blog.repository")
public class BlogMangmntMicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogMangmntMicroserviceApplication.class, args);
    }
}



