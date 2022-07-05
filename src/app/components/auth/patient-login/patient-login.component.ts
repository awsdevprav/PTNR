import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'app/core/enums';
import { CustomvalidationService } from 'app/services/common/customvalidation.service';
import { LoaderService } from 'app/services/common/loader.service';
import { StorageService } from 'app/services/common/storage.service';
import { BodyModel, OptionsModel, OptionsRawLanguageModel, OptionsRawModel, RequestModel, RootModel } from '../../../model/root-model';
import { UserModel } from '../../../model/user';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-patient-login',
    templateUrl: './patient-login.component.html',
    styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

    patientLoginForm: FormGroup;
    formSubmitted = false;
    showPassword = false;
    isShowPopup = false;
    popupMsg = ''
    messageModule = 'AUTH_ERROR_MESSAGES';
    submitted
    errorMessage = ""
    loading = false

    rootModel: RootModel;
    requestModel: RequestModel;
    bodyModel: BodyModel;
    rawModel: any;
    optionModel: OptionsModel;
    optionRawModel: OptionsRawModel;
    optionRawLanguageModel: OptionsRawLanguageModel;
    userModel: UserModel;
    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private _storageService: StorageService,
        private _sanitizer: DomSanitizer
    ) {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')
            if (token) {
                this.router.navigate([Path.Patient]);
            }
        }
    }


    test() {
        console.log("test", this.patientLoginForm.controls)
    }

    ngOnInit(): void {
        console.log("token==================>"+localStorage.getItem('token'))
        console.log("kyc==================>"+localStorage.getItem('kyc'))
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')
           
            if (token) {
                if(localStorage.getItem('kyc') !="null"){
                    console.log("UserDashboard===============")
                    this.router.navigate([Path.UserDashboard]);
                }else{
                    console.log("KycUpload===============")
                    this.router.navigate([Path.KycUpload]);    
                }
            }
        }
        this.patientLoginForm = this.fb.group({
            username: ['narayan2', [Validators.required]],
            password: ['narayan12', [Validators.required]],
            rememberMe: ['true', [Validators.required]]
        });
    }
    
    login() {
        this.loading = true
        this.submitted = true;
        if (this.patientLoginForm.invalid) {
            return false;
        }
        if (this.patientLoginForm.valid) {
           
            this.rootModel = new RootModel();
            this.rootModel.name = "User";
            this.requestModel = new RequestModel();
            this.requestModel.method = "POST";
            this.userModel = new UserModel();
            this.userModel.username = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.username); //this.patientLoginForm.value.username;
            this.userModel.password = this._sanitizer.sanitize(SecurityContext.HTML, this.patientLoginForm.value.password);// this.patientLoginForm.value.password;
            this.authService.userLogin(this.userModel).subscribe((res: any) => {
                if (res?.code === "OK") {
                    console.log("res================>",res);
                    this.toastr.success('', res.message);
                    this._storageService.putDataInStorage("token", res?.token)
                    this._storageService.putDataInStorage("kyc", JSON.stringify(res?.kyc) )
                    
                    if(res?.kyc==null){
                        this.router.navigate([Path.KycUpload]);    
                    }else{
                        this.router.navigate([Path.UserDashboard]);
                    }
                    
                    this.loading = false
                } else {
                    console.log("res", res);
                    this.loading = false
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
