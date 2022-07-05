import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Path } from 'app/core/enums';
import { StorageService } from 'app/services/common/storage.service';
@Component({
    selector: 'app-kyc-upload',
    templateUrl: './kyc-upload.component.html',
    styleUrls: ['./kyc-upload.component.css']
})
export class KYCUploadComponent implements OnInit {
    kycUploadForm: FormGroup;
    messageModule = 'AUTH_ERROR_MESSAGES';
    loading=false
    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        private _storageService: StorageService,
        private router: Router) { }

    ngOnInit(): void {
        this.kycUploadForm = this.fb.group({
            companyname: ['', [Validators.required]],
            address: ['', [Validators.required,]],
            accountno: ['', [Validators.required]],
            certificateofincorporation: ['', [Validators.required]],
            mobilenumber: ['', [Validators.required]],
            ifsccode: ['', [Validators.required]],
            gstcertification: ['', [Validators.required]],
            GSTNo: ['', [Validators.required]],
            pancard: ['', [Validators.required]],
        });
    }
    get f() {
        return this.kycUploadForm.controls
    }
    uploadKyc(){
        console.log("valid===================>",this.kycUploadForm.valid)
        this.loading=true;
        console.log("this.kycUploadForm===================>",this.kycUploadForm.value)
        const formData = new FormData();
        formData.append('companyName', this.kycUploadForm.get('companyname').value);
        formData.append('address', this.kycUploadForm.get('address').value);
        formData.append('accountNo', this.kycUploadForm.get('accountno').value);
        formData.append('certificationOfIncorporation', this.kycUploadForm.get('certificateofincorporation').value);
        formData.append('mobile', this.kycUploadForm.get('mobilenumber').value);
        formData.append('ifscCode', this.kycUploadForm.get('ifsccode').value);
        formData.append('GSTCertificate', this.kycUploadForm.get('gstcertification').value);
        formData.append('panCard', this.kycUploadForm.get('pancard').value);
        formData.append('enctype', 'multipart/form-data');
        formData.append('GSTNo', this.kycUploadForm.get('GSTNo').value);
        this.authService.kycUpload(formData).subscribe((res: any) => {
            console.log("res================>",res);
            this.loading = false
            if (res?.code === 200) {               
                this.toastr.success('', res.message);
                this._storageService.putDataInStorage("kyc", res?.kyc)
                this.kycUploadForm.reset();
                this.router.navigate([Path.UserDashboard]);
            } 
        }, (error: HttpErrorResponse) => {
            this.loading = false
            console.log("error================>",error);
            if (error.status === 401)
                this.toastr.error('', "User authentication failed.");
            else
            this.toastr.error('', error?.error.message);
        })
        
    }
    onGSTFileSelect(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.kycUploadForm.get('gstcertification').setValue(file);
        }
      }
    onCertificateofincorporationFileSelect(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.kycUploadForm.get('certificateofincorporation').setValue(file);
        }
     }
}
