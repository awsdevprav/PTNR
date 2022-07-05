import { DatePipe } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { UserPasswordModel, UserPasswordModelWithUserName } from '../../../model/user';
import { AuthService } from '../../../services/auth/auth.service';
import { EncrDecrService } from '../../../services/crypto/encrpt-decrypt';
import { TestCenterService } from '../../../services/testCenter/test-center.service';

@Component({
    selector: 'app-reset-password-with-username',
    templateUrl: './reset-password-with-username.component.html',
    styleUrls: ['./reset-password-with-username.component.scss']
})
export class ResetPasswordWithUsernameComponent implements OnInit {

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
    userPasswordModel: UserPasswordModelWithUserName;
    constructor(
        private testCenter: TestCenterService,
        private fb: FormBuilder,
        public datepipe: DatePipe,
        private toastr: ToastrService,
        private _sanitizer: DomSanitizer,
        private EncrDecr: EncrDecrService,

    ) {
    }

    ngOnInit(): void {
        this.createPasswordForm = this.fb.group({
            userName: ['', [Validators.required]],
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
        debugger;
        this.submitted = true;
        if (this.createPasswordForm.invalid || this.createPasswordForm.value.newPassword != this.createPasswordForm.value.confirmPassword) {
            return false;
        }
        if (this.createPasswordForm.valid) {
            this.loading = true
            var parsedBase64Key = CryptoJS.enc.Base64.parse(environment.crypto_key);
            var encryptedNewPassword = this.EncrDecr.set(parsedBase64Key, this.createPasswordForm.value.newPassword);

            this.userPasswordModel = new UserPasswordModelWithUserName();
            this.userPasswordModel.username = this._sanitizer.sanitize(SecurityContext.HTML, this.createPasswordForm.value.userName);
            this.userPasswordModel.password = this._sanitizer.sanitize(SecurityContext.HTML, encryptedNewPassword);
            this.userPasswordModel.rePassword = this._sanitizer.sanitize(SecurityContext.HTML, encryptedNewPassword);
            this.testCenter.resetPasswordWithUsername(this.userPasswordModel)
                .subscribe((res: any) => {
                    this.toastr.success('', res);
                    this.loading = false;
                    this.createPasswordForm.reset();
                    this.submitted = false;
                }, (error) => {
                    this.loading = false
                    this.loading = false;
                    this.sendOTPForm.reset();
                    this.createPasswordForm.reset();
                    this.submitted = false;
                    this.toastr.error('', error);

                    console.log("res", error);
                })
        }
        //if (this.createPasswordForm.valid) {
        //    this.loading = true
        //    //let data = {
        //    //  oldPassword: this.createPasswordForm.value.oldPassword,
        //    //  newPassword: this.createPasswordForm.value.newPassword
        //    //}
        //    this.userPasswordModel = new UserPasswordModelWithUserName();
        //    this.userPasswordModel.id = parseInt(localStorage.getItem('userId'));
        //    this.userPasswordModel.username = this.createPasswordForm.value.userName;
        //    this.userPasswordModel.password = this.createPasswordForm.value.newPassword;
        //    this.userPasswordModel.rePassword = this.createPasswordForm.value.newPassword;
        //    this.testCenter.resetPasswordWithUsername(this.userPasswordModel)
        //        .subscribe((res: any) => {
        //            this.toastr.success('', res);
        //            this.loading = false;
        //            this.createPasswordForm.reset();
        //            this.submitted = false;
        //            //if (res?.code === "OK") {

        //            //    this.loading = false;
        //            //    this.sendOTPForm.reset();
        //            //    this.createPasswordForm.reset();
        //            //    this.submitted = false;
        //            //    // this.location.back();
        //            //} else {
        //            //    this.errorMessage = res?.message
        //            //    this.loading = false
        //            //}
        //        }, (error) => {
        //            this.loading = false
        //            this.loading = false;
        //            this.sendOTPForm.reset();
        //            this.createPasswordForm.reset();
        //            this.submitted = false;
        //            alert(error.text);
        //            console.log("res", error);
        //        })

        //}
    }

}
