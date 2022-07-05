import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestCenterService } from 'app/services/testCenter/test-center.service';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { ResetPasswordModel,ConfirmedValidator } from '../../../model/user';
import { ToastrService } from 'ngx-toastr';
import { Path } from 'app/core/enums';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    loading = false;
    resetPasswordForm: FormGroup;
    submitted = false;
    resetPasswordModel = new ResetPasswordModel()

    constructor(
        private testCenter: TestCenterService,
        private fb: FormBuilder,
        private location: Location,
        private router: Router,
        private authService: AuthService,
        public datepipe: DatePipe,
        private toastr: ToastrService,

    ) { }

    ngOnInit(): void {
        this.resetPasswordForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.email]],
            password: ['', [Validators.required]],
            rePassword: ['', [Validators.required]]
        });
    }

    get f() {
        return this.resetPasswordForm.controls
    }

    onSubmitReset() {
       
       
        this.submitted = true;
        if (this.resetPasswordForm.value.password != this.resetPasswordForm.value.rePassword) {
            this.toastr.error('', "confirm must be match with password");
            return false;
        }
        this.loading = true
       
            this.resetPasswordModel = new ResetPasswordModel()
            this.resetPasswordModel.username = this.resetPasswordForm.value.username;
            this.resetPasswordModel.email = this.resetPasswordForm.value.email;
            this.resetPasswordModel.password = this.resetPasswordForm.value.password;
            this.resetPasswordModel.rePassword = this.resetPasswordForm.value.rePassword;
            
            this.authService.resetPasswordWithoutLogin(this.resetPasswordModel)
                .subscribe((res: any) => {
                    this.loading = false
                    if (res?.code === "OK") {
                    this.resetPasswordForm.reset();
                    this.submitted = false;
                    this.toastr.success('', res.message);
                    console.log('res====>', res)
                    this.router.navigate([Path.Auth]);
                    }
                    // }
                }, (error) => {
                    this.toastr.error('', error.error.message);
                    console.log('error====>', error)
                    this.loading = false
                })
       
    }
}
