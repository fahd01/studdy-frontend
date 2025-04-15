import {Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js/auto';
import {CourseService} from "../../../../../services/course-managment/course.service";

import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
Chart.register(MatrixController, MatrixElement);

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
  heatMapChart: any

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getStatistics().subscribe({
      next: data => this.parseStatisticsData(data),
      error: error => console.error("Error fetching course statistics")
    })

    //this.createHeatmapChart()
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

  createHeatmapChart() {
    const rawData = [
      { user: 'Alice', date: '2025-04-07', count: 2 },
      { user: 'Alice', date: '2025-04-08', count: 4 },
      { user: 'Alice', date: '2025-04-09', count: 1 },
      { user: 'Bob',   date: '2025-04-07', count: 1 },
      { user: 'Bob',   date: '2025-04-08', count: 0 },
      { user: 'Bob',   date: '2025-04-09', count: 3 },
      { user: 'Charlie', date: '2025-04-08', count: 5 },
      { user: 'Charlie', date: '2025-04-09', count: 2 },
    ];

    const users = [...new Set(rawData.map((d) => d.user))];
    const dates = [...new Set(rawData.map((d) => d.date))];

    const data = rawData.map((item) => ({
      x: dates.indexOf(item.date),
      y: users.indexOf(item.user),
      v: item.count,
    }));

    this.heatMapChart = new Chart('heatMap', {
      type: 'matrix',
      data: {
        datasets: [
          {
            label: 'Module Completion Heatmap',
            data,
            backgroundColor(ctx: { raw: { v: number } }) {
              const v = ctx.raw.v;
              return `rgba(0, 123, 255, ${v / 6 + 0.1})`;
            },
            width: () => 40,
            height: () => 30,
          } as any,
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            ticks: {
              callback: (_tickValue: string | number, index: number) => dates[index],
            },
            title: { display: true, text: 'Date' },
          },
          y: {
            ticks: {
              callback: (_tickValue: string | number, index: number) => users[index],
            },
            title: { display: true, text: 'User' },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (ctx) => {
                const raw = ctx[0].raw as { x: number; y: number; v: number };
                return `User: ${users[raw.y]}`;
              },
              label: (ctx) => {
                const raw = ctx.raw as { x: number; y: number; v: number };
                return `Date: ${dates[raw.x]}, Completions: ${raw.v}`;
              },
            },
          },
          legend: { display: false },
        },
      }
    });
  }
}
