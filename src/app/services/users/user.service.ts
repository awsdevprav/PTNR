import { DebugElement, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UsersModel } from 'app/model/user';

import { Auth } from 'aws-amplify';

import { environment } from '../../../environments/environment';
import { Url } from '../../core/enums';
import Utility from '../../utilities/utility';
import { APIResponseModel } from '../../model/api-response-model';
import { StorageService } from '../common/storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    token = this._storageService.getDataFromStorage('token');

    constructor(
        private http: HttpClient, private _storageService: StorageService,
    ) { }

    httpoptions() {

        return {
            headers: new HttpHeaders({
                "content-type": 'application/json',
                "accept": '*/*',
                "authorization": `Bearer ${this.token}`
            })
        }
    }

    // upcoming Appoinment
    getSubUserList(userId: string) {
        return this.http.get(`${environment.apiBaseUrl}${Url.subAccountList}${userId}`, this.httpoptions());
    }

    getUserProfile() {
        return this.http.get(`${environment.apiBaseUrl}${Url.usersProfile}`,this.httpoptions() );
    }

    updateUserProfile(data: UsersModel) {
        return this.http.post(`${environment.apiBaseUrl}${Url.users}updateProfile`, data, this.httpoptions());
    }
    getKycStatusList(userId: string) {
        return this.http.get(`${environment.apiBaseUrl}${Url.kycStatusList}${userId}`, this.httpoptions());
    }
    activeInactiveUserStatus(data: any) {
        return this.http.post(`${environment.apiBaseUrl}${Url.bulkActiveInactiveUsersStatus}`, data, this.httpoptions());
    }
}


