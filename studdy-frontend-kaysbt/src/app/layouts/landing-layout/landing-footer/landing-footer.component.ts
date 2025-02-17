import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.css']
})
export class LandingFooterComponent {
  currentYear: number = new Date().getFullYear();
  
  aboutText = `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
              there live the blind texts.`;

  socialLinks = [
    { icon: 'fa fa-twitter', url: '#' },
    { icon: 'fa fa-facebook', url: '#' },
    { icon: 'fa fa-instagram', url: '#' }
  ];

  helpDeskLinks = [
    { text: 'Customer Care', link: '#' },
    { text: 'Legal Help', link: '#' },
    { text: 'Services', link: '#' },
    { text: 'Privacy and Policy', link: '#' },
    { text: 'Refund Policy', link: '#' },
    { text: 'Call Us', link: '#' }
  ];

  recentCourses = [
    { name: 'Computer Engineering', link: '#' },
    { name: 'Web Design', link: '#' },
    { name: 'Business Studies', link: '#' },
    { name: 'Civil Engineering', link: '#' },
    { name: 'Computer Technician', link: '#' },
    { name: 'Web Developer', link: '#' }
  ];

  contactInfo = [
    { 
      icon: 'fa fa-map-marker', 
      text: '203 Fake St. Mountain View, San Francisco, California, USA' 
    },
    { 
      icon: 'fa fa-phone', 
      text: '<a href="#">+2 392 3929 210</a>' 
    },
    { 
      icon: 'fa fa-paper-plane', 
      text: '<a href="#">info@yourdomain.com</a>' 
    }
  ];
}

