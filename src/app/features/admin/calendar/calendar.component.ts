import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: (fetchInfo, successCallback: (events: any[]) => void, failureCallback: (error: any) => void) => {
          this.http.get('/api/blogs/all').subscribe(
            (response: any) => {
              console.log('Fetched blogs:', response);  // Debug log
              const events = response.map((blog: any) => {
                return {
                  title: blog.title,
                  start: blog.createdAt,
                  extendedProps: {
                    comments: blog.comments
                  }
                };
              });
              console.log('Processed events:', events);  // Debug log
              successCallback(events);
            },
            error => {
              console.error('Error fetching blogs:', error);
              failureCallback(error);
            }
          );
        },
        eventClick: (info: any) => {
          const comments = info.event.extendedProps.comments;
          let commentsHtml = '<ul>';
          comments.forEach((comment: any) => {
            commentsHtml += `<li>${comment.content}</li>`;
          });
          commentsHtml += '</ul>';
          const eventDetails = `
            <h3>${info.event.title}</h3>
            <p>Comments:</p>
            ${commentsHtml}
          `;
          const eventModal = document.createElement('div');
          eventModal.innerHTML = eventDetails;
          eventModal.style.position = 'fixed';
          eventModal.style.top = '50%';
          eventModal.style.left = '50%';
          eventModal.style.transform = 'translate(-50%, -50%)';
          eventModal.style.backgroundColor = 'white';
          eventModal.style.padding = '20px';
          eventModal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
          eventModal.style.zIndex = '1000';
          document.body.appendChild(eventModal);

          eventModal.addEventListener('click', function() {
            document.body.removeChild(eventModal);
          });
        }
      });
      calendar.render();
    } else {
      console.error('Calendar element not found');
    }
  }

}