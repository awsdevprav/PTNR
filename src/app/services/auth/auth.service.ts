import { DebugElement, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Auth } from 'aws-amplify';

import { environment } from './../../../environments/environment';
import { Url } from '../../core/enums';
import Utility from '../../utilities/utility';
import { APIResponseModel } from '../../model/api-response-model';
import { UserModel, ResetPasswordModel } from '../../model/user';
import { StorageService } from '../common/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private _storageService: StorageService
    ) { }

    httpoptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*',
            })
        }

    }
    httpoptionsWithToken() {
        let token = this._storageService.getDataFromStorage("token");
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': 'Bearer ' + token
            })
        }

    }
    httpoptionsMultipart() {
        let token = this._storageService.getDataFromStorage("token");
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token
            })
        }

    }
    //private loginDetails;

    //// login
    //login(data) {
    //    return this.http.post(`${environment.apiBaseUrl}${Url.login}`, data, this.httpoptions());
    //}

    //// patient login
    //patientLogin(data) {
    //    return this.http.post(`${environment.apiBaseUrl}${Url.patientLogin}`, data, this.httpoptions());
    //}

    signup(data) {
        return this.http.post(`${environment.apiBaseUrl}${Url.signup}`, data, this.httpoptions());
    }
    //NIXI
    userLogin(userModel: UserModel) {
        return this.http.post<APIResponseModel>(`${environment.apiBaseUrl}${Url.userLogin}`, userModel, this.httpoptions());
    }

    //NIXI
    resetPassword(resetPassword: ResetPasswordModel) {
        return this.http.post<APIResponseModel>(`${environment.apiBaseUrl}${Url.resetPassword}`, resetPassword, this.httpoptions());
    }
    //NIXI
    resetPasswordWithoutLogin(resetPassword: ResetPasswordModel) {
        return this.http.post<APIResponseModel>(`${environment.apiBaseUrl}${Url.resetPasswordWithoutLogin}`, resetPassword, this.httpoptions());
    }
    usersList() {
        return this.http.get<APIResponseModel>(`${environment.apiBaseUrl}${Url.users}`, this.httpoptionsWithToken());
    }

    kycUpload(kyc: FormData) {
        return this.http.post<APIResponseModel>(`${environment.apiBaseUrl}${Url.kycUpload}`, kyc, this.httpoptionsMultipart());
    }
}


