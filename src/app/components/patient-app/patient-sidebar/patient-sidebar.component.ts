import { Component, OnInit } from '@angular/core';
import { CentralAppService } from 'app/services/central-app.service';
import { StorageService } from '../../../services/common/storage.service';

@Component({
    selector: 'app-patient-sidebar',
    templateUrl: './patient-sidebar.component.html',
    styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {
    isAdmin
    isSidebarClose = true
    constructor(
        public rootAppService: CentralAppService,
        private _storageService: StorageService

    ) { }

    ngOnInit(): void {
        if (this._storageService.getDataFromStorage('roles') === 'Admin') {
            this.isAdmin = true;
        }

    }

    ngAfterViewInit(): void {
        this.rootAppService.sidebarSubject.subscribe((toggle) => {
            this.isSidebarClose = toggle
        })
    }
}
