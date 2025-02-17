import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bgImage: string = 'assets/landing/images/bg_1.jpg';
  bgImage1: string = 'assets/landing/images/work-6.jpg';
  bgImage2: string = 'assets/landing/images/bg_2.jpg';
  
  sectionBgImage = 'assets/landing/images/bg_4.jpg';
  categories = [
    { name: 'IT & Software', courseCount: 100, image: 'assets/landing/images/work-1.jpg' },
    { name: 'Music', courseCount: 100, image: 'assets/landing/images/work-9.jpg' },
    { name: 'Photography', courseCount: 100, image: 'assets/landing/images/work-3.jpg' },
    { name: 'Marketing', courseCount: 100, image: 'assets/landing/images/work-5.jpg' },
    { name: 'Health', courseCount: 100, image: 'assets/landing/images/work-8.jpg' },
    { name: 'Audio Video', courseCount: 100, image: 'assets/landing/images/work-6.jpg' }
  ];
  courses = [
    {
      image: 'assets/landing/images/work-1.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    },
    {
      image: 'assets/landing/images/work-2.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    },
    {
      image: 'assets/landing/images/work-3.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    },
    {
      image: 'assets/landing/images/work-4.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    },
    {
      image: 'assets/landing/images/work-5.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    },
    {
      image: 'assets/landing/images/work-6.jpg',
      category: 'Software',
      title: 'Design for the web with Adobe Photoshop',
      advisor: 'Tony Garret',
      enrollments: 2300,
      price: 199
    }
  ];
  counters = [
    {
      icon: 'flaticon-online',
      number: 400,
      start: 0,
      label: 'Online Courses'
    },
    {
      icon: 'flaticon-graduated',
      number: 4500,
      start: 0,
      label: 'Students Enrolled'
    },
    {
      icon: 'flaticon-instructor',
      number: 1200,
      start: 0,
      label: 'Experts Instructors'
    },
    {
      icon: 'flaticon-tools',
      number: 300,
      start: 0,
      label: 'Hours Content'
    }
  ];

  // Logic to animate counters (optional, for actual counting animation)
  ngOnInit() {
    this.counters.forEach(counter => {
      this.animateCounter(counter);
    });
  }

  animateCounter(counter: {number: number, start: number}) {
    let current = counter.start;
    const increment = counter.number / 100;  // Increment by 1% each step
    const interval = setInterval(() => {
      if (current < counter.number) {
        current += increment;
        if (current >= counter.number) {
          current = counter.number;
          clearInterval(interval);
        }
      }
    }, 10);
  }
  aboutImage1 = 'assets/landing/images/about-1.jpg';
  aboutImage2 = 'assets/landing/images/about.jpg';

  // Dynamic content
  subtitle = 'Enhanced Your Skills';
  title = 'Learn Anything You Want Today';
  description = `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, 
                  there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, 
                  a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.`;
  buttonText = 'Get in touch with us';

  // Dynamic subtitle and title
  subtitle1 = 'Testimonial';
  title1 = 'What Are Students Says';

  // List of testimonials
  testimonials = [
    {
      rating: 5,
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: 'assets/landing/images/person_1.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager'
    },
    {
      rating: 5,
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: 'assets/landing/images/person_2.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager'
    },
    {
      rating: 5,
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
      image: 'assets/landing/images/person_3.jpg',
      name: 'Roger Scott',
      position: 'Marketing Manager'
    }
    // Add more testimonials as needed
  ];

  // Function to generate star elements based on rating
  generateStars(rating: number): number[] {
    return new Array(rating);  // returns an array with 'rating' number of stars
  }


  // Data for the services section
  subtitle2 = 'Welcome to StudyLab';
  title2 = 'We Are StudyLab An Online Learning Center';
  description1 = 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.';
  description2 = 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.';
  videoImageUrl = 'assets/landing/images/about.jpg'; // Background image for video link
  videoDescription = 'Learn anything from StudyLab, Watch video';


  // Services data
  services = [
    {
      icon: 'flaticon-tools',
      title: 'Top Quality Content',
      description: 'A small river named Duden flows by their place and supplies'
    },
    {
      icon: 'flaticon-instructor',
      title: 'Highly Skilled Instructor',
      description: 'A small river named Duden flows by their place and supplies'
    },
    {
      icon: 'flaticon-quiz',
      title: 'World Class & Quiz',
      description: 'A small river named Duden flows by their place and supplies'
    },
    {
      icon: 'flaticon-browser',
      title: 'Get Certified',
      description: 'A small river named Duden flows by their place and supplies'
    }
  ];

   // Blog posts data
   blogPosts = [
    {
      id: 1,
      title: "I'm not creative, Should I take this course?",
      imageUrl: "assets/landing/images/image_1.jpg",
      date: "Sept. 17, 2020",
      author: "Admin",
      comments: 3,
      excerpt: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia..."
    },
    {
      id: 2,
      title: "I'm not creative, Should I take this course?",
      imageUrl: "assets/landing/images/image_2.jpg",
      date: "Sept. 17, 2020",
      author: "Admin",
      comments: 3,
      excerpt: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia..."
    },
    {
      id: 3,
      title: "I'm not creative, Should I take this course?",
      imageUrl: "assets/landing/images/image_3.jpg",
      date: "Sept. 17, 2020",
      author: "Admin",
      comments: 3,
      excerpt: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia..."
    }
  ];
}

