package com.example.blog_mangmnt_microservice.blog.service;

import com.example.blog_mangmnt_microservice.blog.exception.ResourceNotFoundException;
import com.example.blog_mangmnt_microservice.blog.model.Comment;
import com.example.blog_mangmnt_microservice.blog.model.CommentReaction;
import com.example.blog_mangmnt_microservice.blog.model.CreateComment;
import com.example.blog_mangmnt_microservice.blog.repository.CommentReactionRepository;
import com.example.blog_mangmnt_microservice.blog.repository.CommentRepository;
import com.example.blog_mangmnt_microservice.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CommentService {

    private static final Logger logger = Logger.getLogger(CommentService.class.getName());

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentReactionRepository commentReactionRepository;

    public Comment createComment(CreateComment createComment) {
        Comment comment = new Comment();
        comment.setContent(createComment.getContent());
        comment.setBlogId(createComment.getBlogId());
        comment.setUserId(createComment.getUserId());
        comment.setCreatedAt(createComment.getCreatedAt());
        comment.setUsername(userRepository.findById(createComment.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createComment.getUserId()))
                .getUsername());
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByBlogId(Long blogId) {
        List<Comment> comments = commentRepository.findByBlogId(blogId);
        logger.info("Fetched " + comments.size() + " comments for blog ID " + blogId);
        comments.forEach(comment -> {
            comment.setUsername(userRepository.findById(comment.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + comment.getUserId()))
                    .getUsername());
            logger.info("Comment: " + comment);
        });
        return comments;
    }

    public List<Comment> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        logger.info("Fetched " + comments.size() + " comments in total");
        comments.forEach(comment -> {
            comment.setUsername(userRepository.findById(comment.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + comment.getUserId()))
                    .getUsername());
            logger.info("Comment: " + comment);
        });
        return comments;
    }
    public Comment likeComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        CommentReaction reaction = commentReactionRepository.findByCommentIdAndUserId(commentId, userId)
                .orElse(new CommentReaction(null, commentId, userId, false, false));

        if (reaction.isLiked()) {
            reaction.setLiked(false);
            comment.setLikes(comment.getLikes() - 1);
        } else {
            if (reaction.isDisliked()) {
                reaction.setDisliked(false);
                comment.setDislikes(comment.getDislikes() - 1);
            }
            reaction.setLiked(true);
            comment.setLikes(comment.getLikes() + 1);
        }

        commentReactionRepository.save(reaction);
        return commentRepository.save(comment);
    }

    public Comment dislikeComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        CommentReaction reaction = commentReactionRepository.findByCommentIdAndUserId(commentId, userId)
                .orElse(new CommentReaction(null, commentId, userId, false, false));

        if (reaction.isDisliked()) {
            reaction.setDisliked(false);
            comment.setDislikes(comment.getDislikes() - 1);
        } else {
            if (reaction.isLiked()) {
                reaction.setLiked(false);
                comment.setLikes(comment.getLikes() - 1);
            }
            reaction.setDisliked(true);
            comment.setDislikes(comment.getDislikes() + 1);
        }

        commentReactionRepository.save(reaction);
        return commentRepository.save(comment);
    }
}
