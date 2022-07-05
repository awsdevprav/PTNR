import { Component, NgModuleFactoryLoader, OnInit } from '@angular/core';
import { UserService } from 'app/services/users/user.service';
import { StorageService } from 'app/services/common/storage.service';
import { KYCProfileModel } from 'app/model/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profileModel: any;
    loading: boolean = false;
    userForm: FormGroup;
    editableForm = {
        visible: false
    }
    submitted = false

    constructor(
        private userService: UserService,
        private _storageService: StorageService,
        private fb: FormBuilder,
        private toastr: ToastrService,
    ) {
        this.editableForm['visible'] = true
    }

    ngOnInit(): void {
        this.getUserProfile()
    }
    get f() {
        return this.userForm.controls
    }
    getUserProfile() {        
        this.userService.getUserProfile()
            .subscribe((res: any) => {
                this.loading = false
                if (res?.code === "OK") {
                    this.profileModel = res
                    console.log(this.profileModel);

                    this.userForm = this.fb.group({
                        accountNo: [this.profileModel.kyc.accountNo, [Validators.required]],
                        address: [this.profileModel.kyc.address, [Validators.required]],
                        //approvedBy: [this.profileModel.kyc.approvedBy],
                        //approvedDate: [this.profileModel.kyc.approvedDate],
                        certificationOfIncorporation: [this.profileModel.kyc.certificationOfIncorporation, [Validators.required]],
                        companyName: [this.profileModel.kyc.companyName, [Validators.required]],
                        createdDate: [this.profileModel.kyc.createdDate, [Validators.required]],
                        gstcertificate: [this.profileModel.kyc.gstcertificate, [Validators.required]],
                        gstno: [this.profileModel.kyc.gstno, [Validators.required]],
                        id: [this.profileModel.kyc.id, [Validators.required]],
                        ifscCode: [this.profileModel.kyc.ifscCode, [Validators.required]],
                        mobile: [this.profileModel.kyc.mobile, [Validators.required]],
                        panCard: [this.profileModel.kyc.panCard, [Validators.required]],
                        status: [this.profileModel.kyc.status, [Validators.required]],
                        user: [this.profileModel.kyc.user, [Validators.required]],
                        username: [this.profileModel.user.username, [Validators.required]],
                        email: [this.profileModel.user.email, [Validators.required]],
                        referalCode: [this.profileModel.user.referalCode, [Validators.required]],
                    });
                } else {

                }
            }, (error) => {
                this.loading = false
                if (error?.status === "Bad Request") {
                }
                console.log("error", error);
            })
    }

    isEditShow() {
        console.log(this.profileModel);
        this.userForm.controls['email'].disable();
        this.userForm.controls['referalCode'].disable();
        this.editableForm.visible = !this.editableForm.visible
        this.submitted = false;
    }

    updateUser() {
        debugger;
        this.submitted = true;
        if (this.userForm.valid) {
            const { address, mobile, fullname } = this.userForm.value/*, roles*/
            this.profileModel.address = address
            this.profileModel.mobile = mobile
            this.profileModel.companyName = fullname

            //this.userService.updateUserProfile(this.profileModel)
            //    .subscribe((res: any) => {
            //        this.loading = false;
            //        this.submitted = false;
            //        this.isEditShow()
            //        if (res?.code === "OK") {
            //            this.toastr.success("", res?.message)
            //        } else {

            //        }
            //    }, (error) => {
            //        this.loading = false
            //        if (error?.status === "Bad Request") {
            //        }
            //        this.toastr.error("", "User not able to update")
            //        this.isEditShow()
            //    })
        }
    }



}
