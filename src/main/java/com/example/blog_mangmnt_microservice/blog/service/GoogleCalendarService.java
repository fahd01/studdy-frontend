package com.example.blog_mangmnt_microservice.blog.service;

import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GoogleCalendarService {

    @Autowired
    private Calendar googleCalendar;

    public List<Event> getEvents(String calendarId) throws IOException {
        Events events = googleCalendar.events().list(calendarId)
                .setMaxResults(10)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        return events.getItems();
    }

    public Event createEvent(String calendarId, Event event) throws IOException {
        return googleCalendar.events().insert(calendarId, event).execute();
    }

    public void deleteEvent(String calendarId, String eventId) throws IOException {
        googleCalendar.events().delete(calendarId, eventId).execute();
    }
}
