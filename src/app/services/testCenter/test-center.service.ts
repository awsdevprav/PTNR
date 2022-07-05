import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from 'app/core/enums';
import { environment } from 'environments/environment';
import { APIResponseModel } from '../../model/api-response-model';
import { KYCModel, RawModel } from '../../model/e-verify-adhaar';
import { UserModel, UserPasswordModel, CreateSubAccountModel, UserPasswordModelWithUserName } from '../../model/user';
import { StorageService } from '../common/storage.service';

@Injectable({
    providedIn: 'root'
})
export class TestCenterService {
    token = this._storageService.getDataFromStorage('token');
    constructor(
        private http: HttpClient, private _storageService: StorageService,
    ) { }

    httpoptions() {

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*'
            })
        }

    }
    
    patientProfile() {
        return this.http.get(`${environment.apiBaseUrl}${Url.patientProfile}`, this.httpoptions());
    }

    //NIXI
    resetPassword(userPasswordModel: UserPasswordModel) {
        return this.http.post(`${environment.apiBaseUrl}/users/password-reset`, userPasswordModel, { responseType: 'text' });
    }
    resetPasswordWithUsername(userPasswordModelWithUserName: UserPasswordModelWithUserName) {
        return this.http.post(`${environment.apiBaseUrl}/users/password-reset`, userPasswordModelWithUserName, { responseType: 'text' });
    }
    otpConnector(rootModel: RawModel) {
        return this.http.post(`${environment.apiBaseUrl}/otp-connector/`, rootModel, { headers: new HttpHeaders().set("authorization", `Bearer ${this.token}`), responseType: 'text'});
    }
    kycConnector(rootModel: KYCModel) {
        return this.http.post(`${environment.apiBaseUrl}/kyc-connector/`, rootModel, { headers: new HttpHeaders().set("authorization", `Bearer ${this.token}`), responseType: 'text' });
    }

    addUser(createSubAccountModel: CreateSubAccountModel) {
        return this.http.post(`${environment.apiBaseUrl}/users/add`, createSubAccountModel, { headers: new HttpHeaders().set("authorization", `Bearer ${this.token}`), responseType: 'text' });
    }
    kycUpdate(data: any) {
        return this.http.post(`${environment.apiBaseUrl}/kyc-connector/kycUpdate`, data, { headers: new HttpHeaders().set("authorization", `Bearer ${this.token}`), responseType: 'text' });
    }
    getKYCConstantData(userId) {
        return this.http.get(`${environment.apiBaseUrl}${Url.usersProfile}${userId}`, this.httpoptions());
    }
    updateKYCConstantData(data: RawModel) {
        return this.http.post(`${environment.apiBaseUrl}${Url.users}updateProfile`, data, this.httpoptions());
    }
    updateOTPConstantData(data: KYCModel) {
        return this.http.post(`${environment.apiBaseUrl}${Url.users}updateProfile`, data, this.httpoptions());
    }
}
