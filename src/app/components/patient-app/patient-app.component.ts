import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CentralAppService } from 'app/services/central-app.service';

@Component({
  selector: 'app-patient-app',
  templateUrl: './patient-app.component.html',
  styleUrls: ['./patient-app.component.scss']
})
export class PatientAppComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<string>();
  
  isSidebarClose = true

  constructor(
    public rootAppService: CentralAppService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rootAppService.sidebarSubject.subscribe((toggle) => {
      this.isSidebarClose = toggle
    })
  }

}
