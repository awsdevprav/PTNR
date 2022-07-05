import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Path } from 'app/core/enums';
import { StorageService } from 'app/services/common/storage.service';
@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {
  loading = false
  usersList=[];
  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private _storageService: StorageService,
    ) {
    
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true
    debugger;
        this.authService.usersList().subscribe((res: any) => {
          
            if (res?.code === "OK") {
              this.usersList = res.users;
              this.toastr.success('', res.message);
               this.loading = false
            } else {
                console.log("res", res);
                this.loading = false
            }
        }, (error: HttpErrorResponse) => {
          console.log("usersList===============>",error);
            if (error.status === 401)
                this.toastr.error('',  "Unauthorized user");
            else
            this.toastr.error('', error?.error.message);
            this.loading = false
            //this.router.navigate([Path.Auth]);
        })
    
}
}
