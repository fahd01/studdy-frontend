import {Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js/auto';
import {CourseService} from "../../../../../services/course-managment/course.service";

// TODO add the following stats
// Enrollments by category (polar area)
// Enrollments by month (bar)
//

@Component({
  selector: 'app-course-statistics',
  templateUrl: './course-statistics.component.html',
  styleUrls: ['./course-statistics.component.css']
})
export class CourseStatisticsComponent implements OnInit {
  barChart: any
  pieChart: any

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getStatistics().subscribe({
      next: data => this.parseStatisticsData(data),
      error: error => console.error("Error fetching course statistics")
    })
  }

  createPieChart(pieChartData: any) {
    this.pieChart = new Chart("pieChart", {
      type: 'doughnut',
      data: pieChartData,
      options: {
        //aspectRatio:2.5
      }
    });
  }

  createBarChart(data: any){
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: data,
      options: {
        //aspectRatio:2.5
      }
    });
  }

  parseStatisticsData(data: any){
    this.parseCategoriesData(data)
    this.parseEnrollmentsByMonthData(data)
  }

  parseEnrollmentsByMonthData(data:any) {
    let enrollmentArray = data["enrollment_by_month"]
    let barChartData = {
      labels: enrollmentArray[0],
      datasets: [
      {
        label: "Enrollments",
        data: enrollmentArray[1],
        backgroundColor: 'pink'
      }
      // TODO more datasets can be plotted on the same chart for multi bars per x value (month)
    ]
    }
    this.createBarChart(barChartData)
  }

  parseCategoriesData(data: any) {
    let categoriesMap = new Map(Object.entries(data["categories"]))
    let pieChartData = {
      labels: [ ...categoriesMap.keys() ],
      datasets: [{
        label: 'Number of Courses',
        data: [ ...categoriesMap.values() ],
        backgroundColor: [ ...categoriesMap.keys() ].map(key => this.generateRandomColor()),
        hoverOffset: 4
      }]
    };
    this.createPieChart(pieChartData)
  }

  generateRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
}
