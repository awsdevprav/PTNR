import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordWithUsernameComponent } from './reset-password-with-username/reset-password-with-username.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { LoadingComponent } from 'app/shared/loading/loading.component';
import { BotDetectCaptchaModule } from 'angular-captcha';
@NgModule({
    declarations: [PatientLoginComponent, ResetPasswordComponent, ResetPasswordWithUsernameComponent, SignUpComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgOtpInputModule,
        NgbModule,
        BotDetectCaptchaModule
   ],
    providers: [DatePipe]
})
export class AuthModule { }
