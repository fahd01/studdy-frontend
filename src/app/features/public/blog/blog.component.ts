import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  postId!: number;
  postDetails: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];  // Capture blog post id from URL
      this.fetchPostDetails();
    });
  }

  fetchPostDetails() {
    // Fetch post details using the postId
    // For simplicity, hardcode it here or fetch it from a backend
    this.postDetails = {
      title: "I'm not creative, Should I take this course?",
      content: "This is where the full content of the blog post would go...",
      date: "Sept. 17, 2020",
      author: "Admin"
    };
  }
}
