import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Url } from "../../core/enums";

@Injectable({
    providedIn: 'root'
})
export class MyCaptchaService {
    httpoptions() {

        return {
            headers: new HttpHeaders({
                "content-type": 'application/json',
                "accept": '*/*'
            })
        }
    }
    constructor(private http: HttpClient) { }

    send(data: any) {
        return this.http.post(`${environment.apiBaseUrl}${Url.bulkActiveInactiveUsersStatus}`, data, this.httpoptions());
    }
}


