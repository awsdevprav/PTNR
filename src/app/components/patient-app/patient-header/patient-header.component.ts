import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentralAppService } from 'app/services/central-app.service';
import { TestCenterService } from 'app/services/testCenter/test-center.service';
import { debug } from 'console';
import { StorageService } from '../../../services/common/storage.service';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {
  hamburger = false
  displayStyle = "none"
  loading = false
  errorMessage
    prifileData
    userName
  constructor(
    private testCenterService: TestCenterService,
    private router: Router,
      public rootAppService: CentralAppService,
      private _storageService: StorageService

  ) { }

  ngOnInit(): void {
      //this.patientProfile();
      this.userName = this._storageService.getDataFromStorage('userName')

  }

  logout(){
    // console.log("event---------")
    //this.loading = true
    localStorage.clear()
      this.router.navigate(['/auth/sign-in']);
    //this.testCenterService.logout()
    //  .subscribe((res: any) => {
    //    this.loading = true
    //    if (res?.status === "OK") {
    //      console.log("logout", res)
    //      localStorage.clear()
    //        //this.router.navigate(['/auth']);
    //        this.router.navigate(['/auth/sign-in']);

    //    } else {
    //      console.log("res", res);
    //    }
    //    this.loading = false
    //    this.displayStyle = "none";
    //  }, (error) => {
    //    if (error?.status === "Bad Request") {
    //      this.loading = false
    //      this.errorMessage = error?.message
    //    }
    //    console.log("res", error);
    //  })
  }

  openPopup() {
    this.displayStyle = "block";
  }


  patientProfile() {
    this.loading = true
    this.testCenterService.patientProfile()
      .subscribe((res: any) => {
        this.loading = true
        if (res?.status === "OK") {
          console.log("profile data", res?.data?.user);
          this.prifileData = res?.data?.user
        } else {
          console.log("res", res);
        }
        this.loading = false
      }, (error) => {
        if (error?.status === "Bad Request") {
          this.loading = false
          this.errorMessage = error?.message
        }else if(error.status = "Unauthorized"){
          localStorage.clear()
          this.router.navigate(['/auth/patient-login']);
        }
        console.log("res", error);
      })
  }

  closePopup(){
    this.displayStyle = "none"
  }

  toggleMenu(){
    this.hamburger = !this.hamburger
    this.rootAppService.sidebarSubject.next(this.hamburger)
  }

}
