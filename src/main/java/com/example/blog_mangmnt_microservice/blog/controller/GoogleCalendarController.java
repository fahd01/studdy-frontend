package com.example.blog_mangmnt_microservice.blog.controller;

import com.example.blog_mangmnt_microservice.blog.service.GoogleCalendarService;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class GoogleCalendarController {

    @Autowired
    private GoogleCalendarService googleCalendarService;

    @GetMapping("/events")
    public List<Event> getEvents(@RequestParam String calendarId) throws IOException {
        return googleCalendarService.getEvents(calendarId);
    }

    @PostMapping("/events")
    public Event createEvent(@RequestParam String calendarId, @RequestBody Event event) throws IOException {
        return googleCalendarService.createEvent(calendarId, event);
    }

    @DeleteMapping("/events/{eventId}")
    public void deleteEvent(@RequestParam String calendarId, @PathVariable String eventId) throws IOException {
        googleCalendarService.deleteEvent(calendarId, eventId);
    }
}