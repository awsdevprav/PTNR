import { Component, OnInit, ViewChild,SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaComponent } from 'angular-captcha';
import { MyCaptchaService } from '../../../services/users/captcha.service';
import { UsersRegistrationModel } from '../../../model/user';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Path } from 'app/core/enums';
import { Router } from '@angular/router';
declare function createCaptcha(): any;


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    patientLoginForm: FormGroup;
    loading = false;
    submitted = false;
    messageModule = 'AUTH_ERROR_MESSAGES';
    usersRegistrationModel: UsersRegistrationModel;
    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private _sanitizer: DomSanitizer,
        private authService: AuthService,
        private yourFormWithCaptchaService: MyCaptchaService
) { }

    ngOnInit(): void {
        this.patientLoginForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            captcha: ['', [Validators.required]],
        });
        createCaptcha();
    }


    registeration() {
        this.loading = true
        this.submitted = true;
        if (this.patientLoginForm.invalid) {
            return false;
        }
        if (this.patientLoginForm.valid) {
            debugger

            this.usersRegistrationModel = new UsersRegistrationModel();
            console.log("patientLoginForm===========>",this.patientLoginForm.value);
            this.usersRegistrationModel.username = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.username);
            this.usersRegistrationModel.email = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.email);
            this.usersRegistrationModel.fullname = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.fullname);
            this.usersRegistrationModel.password = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.password);
            this.authService.signup(this.usersRegistrationModel).subscribe((res: any) => {
                console.log("res==========>",res);
                if (res?.code === "OK") {
                    this.loading = false
                    this.toastr.success('', res.message);
                    this.router.navigate([Path.Auth]);
                }

            }, (error: HttpErrorResponse) => {
                if (error.status === 401)
                    this.toastr.error('', "User authentication failed.");
                else
                this.toastr.error('', error?.error.message);
                this.loading = false
            })   
        }
    }

    get f() {
        return this.patientLoginForm.controls
    }
}
