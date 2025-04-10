import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService, Role} from "../../../../services/Authenticarion.service";
import {CourseService} from "../../../../services/course-managment/course.service";
import {Module} from "../../../../models/Module.model";

// Jitsi server
const JITSI_SERVER_DOMAIN: string = 'meet.jit.si';

@Component({
  selector: 'app-live-course',
  templateUrl: './live-course.component.html',
  styleUrls: ['./live-course.component.css']
})
export class LiveCourseComponent  implements AfterViewInit, OnInit {

  roomName: string = ''; // Room name
  api: any;
  module!: Module


  constructor(
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private courseService: CourseService
  ) {}

  ngOnInit() {
    const courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const moduleId = Number(this.activatedRoute.snapshot.paramMap.get('moduleId'));

    this.courseService.getModule(courseId, moduleId).subscribe({
      next: data => this.module = data,
      error: error => console.error(`Error occurred while fetching module ${moduleId}`, error)
    })
  }

  ngAfterViewInit() {
    this.loadJitsiScript();

    this.activatedRoute.queryParams.subscribe(params => {
      // Get room name from URL or default
      this.roomName = params['room'] || 'CourseRoom-123';
    });
  }

  loadJitsiScript() {
    if (!(window as any).JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => console.log('Jitsi API loaded');
      document.body.appendChild(script);
    }
  }

  startConference() {
    // Prevent multiple instances
    if (this.api) {
      console.log("Conference already running");
      return;
    }

    // Generate unique room
    this.roomName = 'CourseRoom-' + Math.random().toString(36).substring(2, 9);

    const options = {
      roomName: this.roomName,
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: { displayName: `Instructor ${this.authenticationService.getCurrentUser()?.firstName} ${this.authenticationService.getCurrentUser()?.lastName}` }
    };

    this.api = new (window as any).JitsiMeetExternalAPI(JITSI_SERVER_DOMAIN, options);

    // Listen for when the meeting ends
    this.api.addEventListener('readyToClose', () => {
      this.api.dispose(); // Destroy the instance
      this.api = null;
    });
  }

  joinConference() {
    // Prevent multiple instances
    if (this.api) {
      console.log("Already in a conference");
      return;
    }

    const options = {
      roomName: this.roomName,
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: { displayName: `${this.authenticationService.getCurrentUser()?.firstName}` }
    };

    this.api = new (window as any).JitsiMeetExternalAPI(JITSI_SERVER_DOMAIN, options);

    // Listen for when the meeting ends
    this.api.addEventListener('readyToClose', () => {
      this.api.dispose();
      this.api = null;
    });
  }

  endConference() {
    if (this.api) {
      this.api.dispose();
      this.api = null;
      console.log("Conference ended");
    }
  }

  isStudent() {
    return this.authenticationService.getCurrentUser()?.roles.includes(Role.STUDENT)
  }

  isInstructor() {
    return this.authenticationService.getCurrentUser()?.roles.includes(Role.INSTRUCTOR)
  }

  humanReadableFileSize(size: number | undefined) {
    if (!size) return '0 Bytes'
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while(size >= 1024) { size /= 1024; ++i;}
    return `${size.toFixed(1)} ${units[i]}`;
  }
}