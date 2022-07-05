export class UserModel {
    constructor() {
    }
    public username: string;
    public password: string;
    public parentUserId: number;
}

export class UsersModel { 
    constructor() {
    }
    public fullname: string;
    public username: string;
    public password: string;
    public email: number;
    public roles: number;
    public mobile: number;
    public address: number;
    public parentUserId: number;
}
export class UserPasswordModel {
    constructor() {

    }
    public id: number;
    public password: string;
    public rePassword: string;
}
export class UserPasswordModelWithUserName {
    constructor() {

    }
    public id: number;
    public username: string;
    public password: string;
    public rePassword: string;
}
export class UsersRegistrationModel {
    constructor() {
    }
    public username: string;
    public email: string;
    public fullname: string;
    public password: string;
}

export class CreateSubAccountModel {
    public username: string;
    public email: string;
    //public phone: string;
    public address: string;
    public password: string;
    public parentUserId: number;
    public fullname: string;
    public mobile: string;
    public id: string;
    public roles: string;
}

export class ResetPasswordModel {
    public username: string;
    public email: string;
    public password: string;
    public rePassword: string;
}

export class BulkActiveInactiveUsersStatus {
    status: boolean;
    users: string[]=[];
}
import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

//FOR PROFILE PAGE AFTER KYC UPLOAD
export class KYCProfileModel {
    public accountNo: string;
    public address: string;
    public approvedBy: string;
    public approvedDate: string;
    public certificationOfIncorporation: string;
    public companyName: string;
    public createdDate: string;
    public gstcertificate: string;
    public gstno: string;
    public id: number;
    public ifscCode: string;
    public mobile: string;
    public panCard: string;
    public status: string;
    public user: string;
}