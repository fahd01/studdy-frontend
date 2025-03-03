package com.esprit.study.controller;

import com.esprit.study.entities.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @MessageMapping("/sendNotification")
    @SendTo("/topic/notifications")
    public Notification sendNotification(String message) {
        return new Notification(message);
    }
}
