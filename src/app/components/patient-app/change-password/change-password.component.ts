import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestCenterService } from 'app/services/testCenter/test-center.service';
import { timer } from 'rxjs';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { state } from 'app/core/constants/states';
import { Path } from 'app/core/enums';
import { UserPasswordModel } from '../../../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class PatientChangePasswordComponent implements OnInit {

    displayStyle = "none"

    sendOTPForm: FormGroup;
    createPasswordForm: FormGroup;
    mobileNo
    otpSent = true
    submitted
    loading = false
    tempOtp
    otpNo
    errorMessage = ""
    enabledOTP = false
    continueAppoinment
    successMessage
    footerBtn = false;

    forgotPasswordToken: any = '';
    step = 1;
    userPasswordModel: UserPasswordModel;
    constructor(
        private testCenter: TestCenterService,
        private fb: FormBuilder,
        private location: Location,
        private router: Router,
        private authService: AuthService,
        public datepipe: DatePipe,
        private toastr: ToastrService,

    ) {
    }

    ngOnInit(): void {
        this.createPasswordForm = this.fb.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [
                Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
            ]],
            confirmPassword: ['', [Validators.required]],
        })
    }

    openPopup() {
        this.displayStyle = "block";
    }

    closePopup() {
        this.displayStyle = "none";
    }

    get f() {
        return this.createPasswordForm.controls
    }

    setPassword() {
        this.submitted = true;
        if (this.createPasswordForm.invalid || this.createPasswordForm.value.newPassword != this.createPasswordForm.value.confirmPassword) {
            return false;
        }
        if (this.createPasswordForm.valid) {
            debugger;
            this.loading = true
            //let data = {
            //  oldPassword: this.createPasswordForm.value.oldPassword,
            //  newPassword: this.createPasswordForm.value.newPassword
            //}
            this.userPasswordModel = new UserPasswordModel();
            this.userPasswordModel.id = parseInt(localStorage.getItem('userId'));
            this.userPasswordModel.password = this.createPasswordForm.value.newPassword;
            this.userPasswordModel.rePassword = this.createPasswordForm.value.newPassword;
            this.testCenter.resetPassword(this.userPasswordModel)
                .subscribe((res: any) => {
                    debugger;
                    this.toastr.success('', res);
                    if (res?.code === "OK") {
                        this.loading = false;
                        this.createPasswordForm.reset();
                        this.submitted = false;
                    } else {
                        this.errorMessage = res?.message
                        this.loading = false
                    }
                }, (error) => {
                    debugger;
                    this.loading = false
                    this.createPasswordForm.reset();
                    this.submitted = false;
                    alert(error.text);
                })
        }
    }

}
