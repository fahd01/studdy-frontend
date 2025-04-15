import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartsService } from './charts.service';
import { Blog } from '../../public/blog/blog.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  blogs: Blog[] = [];
  userCount: number = 0;

  constructor(private chartsService: ChartsService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartsService.getBlogs().subscribe((data) => {
      this.blogs = data;
      this.fetchUserCount();
    });
  }

  fetchUserCount(): void {
    this.chartsService.getUserCount().subscribe((data) => {
      this.userCount = data;
      this.createCharts();
    });
  }

  createCharts(): void {
    const blogTitles = this.blogs.map(blog => blog.title);
    const commentCounts = this.blogs.map(blog => blog.comments ? blog.comments.length : 0);
    const userCounts = new Array(blogTitles.length).fill(this.userCount);

    // Line chart
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: blogTitles,
        datasets: [
          {
            label: 'Number of Comments',
            data: commentCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'User Count',
            data: userCounts,
            borderColor: 'rgba(192, 75, 75, 1)',
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear'
          }
        }
      }
    });

    // Bar chart
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: blogTitles,
        datasets: [
          {
            label: 'Number of Comments',
            data: commentCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'User Count',
            data: userCounts,
            backgroundColor: 'rgba(192, 75, 75, 0.2)',
            borderColor: 'rgba(192, 75, 75, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear'
          }
        }
      }
    });

    // Pie chart
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: blogTitles,
        datasets: [
          {
            label: 'Number of Comments',
            data: commentCounts,
            backgroundColor: blogTitles.map(() => 'rgba(75, 192, 192, 0.2)'),
            borderColor: blogTitles.map(() => 'rgba(75, 192, 192, 1)'),
            borderWidth: 1
          },
          {
            label: 'User Count',
            data: userCounts,
            backgroundColor: blogTitles.map(() => 'rgba(192, 75, 75, 0.2)'),
            borderColor: blogTitles.map(() => 'rgba(192, 75, 75, 1)'),
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}