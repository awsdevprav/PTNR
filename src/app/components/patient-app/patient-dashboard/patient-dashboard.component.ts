import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Path } from 'app/core/enums';
import { StorageService } from 'app/services/common/storage.service';
import { TestCenterService } from 'app/services/testCenter/test-center.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
    selector: 'app-patient-dashboard',
    templateUrl: './patient-dashboard.component.html',
    styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements AfterViewInit {
    @ViewChild('pieCanvas') private pieCanvas: ElementRef;
    pieChart: any;

    @ViewChild('barCanvas') private barCanvas: ElementRef;
    barChart: any;

    @ViewChild('barCanvasWeekly') private barCanvasWeekly: ElementRef;
    barChartWeekly: any;

    constructor(
        private testCenterService: TestCenterService,
        private _storageService: StorageService,
        private router: Router,
        private calendar: NgbCalendar,
        private fb: FormBuilder,
        public datepipe: DatePipe
    ) { }

    ngAfterViewInit(): void {
        // this.pieChartBrowser();
        this.barChartMethod();
        this.barChartMethodWeekly();
    }
    pieChartBrowser(): void {
        this.pieChart = new Chart(this.pieCanvas.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    backgroundColor: [
                        '#2ecc71',
                        '#3498db',
                        '#95a5a6',
                        '#9b59b6',
                        '#f1c40f',
                        '#e74c3c',
                        '#cccccc',
                        '#D8365D',
                        '#EEBAE5',
                        '#002F8B',
                        '#C0D1EB',
                        '#F89938'

                    ],
                    data: [12, 19, 3, 17, 28, 24, 12, 19, 3, 17, 28, 24]
                }]
            }
        });
    }

    barChartMethod() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: 'Active',
                    data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638, 1326, 687, 1271, 1638],
                    backgroundColor: '#309352',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    //yAxisID: "y-axis-density"
                },
                {
                    label: 'Inactive',
                    data: [5427, 5243, 5514, 3933, 1326, 9.0, 8.7, 11.0, 1326, 687, 1271, 1638],
                    backgroundColor: '#DC3545',
                    borderColor: 'rgba(99, 132, 0, 1)',
                    //yAxisID: "y-axis-gravity"
                },
                {
                    label: 'Pending',
                    data: [5400, 5200, 5500, 3900, 1300, 687, 1271, 1638, 1326, 687, 1271, 1638],
                    backgroundColor: '#5C58AF',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    //yAxisID: "y-axis-density"
                }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                    //,
                    //title: {
                    //    display: true,
                    //    text: 'Chart.js Bar Chart'
                    //}
                },
                scales: {
                    //y: {
                    //    beginAtZero: true
                    //}
                    //,
                    //x: {
                    //    grid: {
                    //        offset: true
                    //    }
                    //}

                }
            }
        });
    }


    barChartMethodWeekly() {
        this.barChartWeekly = new Chart(this.barCanvasWeekly.nativeElement, {
            type: 'bar',
            data: {
                labels: ["Week1", "Week2", "Week3", "Week4", "Week5"],
                datasets: [{
                    label: 'Active',
                    data: [5427, 5243, 5514, 3933, 1326],
                    backgroundColor: '#309352',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    //yAxisID: "y-axis-density"
                },
                {
                    label: 'Inactive',
                    data: [5427, 5243, 5514, 3933, 1326],
                    backgroundColor: '#DC3545',
                    borderColor: 'rgba(99, 132, 0, 1)',
                    //yAxisID: "y-axis-gravity"
                },
                {
                    label: 'Pending',
                    data: [5400, 5200, 5500, 3900, 1300],
                    backgroundColor: '#5C58AF',
                    borderColor: 'rgba(0, 99, 132, 1)',
                    //yAxisID: "y-axis-density"
                }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                    //,
                    //title: {
                    //    display: true,
                    //    text: 'Chart.js Bar Chart'
                    //}
                },
                scales: {
                    //y: {
                    //    beginAtZero: true
                    //}
                    //,
                    //x: {
                    //    grid: {
                    //        offset: true
                    //    }
                    //}

                }
            }
        });
    }
    //barChartMethod() {
    //    this.barChart = new Chart(this.barCanvas.nativeElement, {
    //        type: 'bar',
    //        data: {
    //            labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
    //            datasets: [{
    //                label: '# of Votes',
    //                data: [600, 500, 300, 150, 200, 340],
    //                backgroundColor: [
    //                    'rgba(255, 99, 132, 0.2)',
    //                    'rgba(54, 162, 235, 0.2)',
    //                    'rgba(255, 206, 86, 0.2)',
    //                    'rgba(75, 192, 192, 0.2)',
    //                    'rgba(153, 102, 255, 0.2)',
    //                    'rgba(255, 159, 64, 0.2)'
    //                ],
    //                borderColor: [
    //                    'rgba(255,99,132,1)',
    //                    'rgba(54, 162, 235, 1)',
    //                    'rgba(255, 206, 86, 1)',
    //                    'rgba(75, 192, 192, 1)',
    //                    'rgba(153, 102, 255, 1)',
    //                    'rgba(255, 159, 64, 1)'
    //                ],
    //                borderWidth: 1

    //            }]
    //        },
    //        options: {
    //            scales: {                    
    //                y: {
    //                    beginAtZero: true
    //                },
    //                x: {
    //                    grid: {
    //                        offset: true
    //                    }
    //                }

    //            }
    //        }
    //    });
    //}



}
