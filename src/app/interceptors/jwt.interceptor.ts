import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import Utility from '../utilities/utility';
import { StorageService } from 'app/services/common/storage.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    productionEnvironment = environment.production;

    constructor(
        private _storageService: StorageService,
    ) {

    }

    private handleAuthError(err: HttpErrorResponse): Observable<any>  {
        //handle your auth error or rethrow
        debugger;
        if (err.status === 401) {
            throw new Error(err.message);
        }
        if (err.status === 405) {

        }
        if (err.status === 403) {

        }
        return Observable.throw(err);
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        let arHeaders: any = {
        };
        debugger;
        let token = this._storageService.getDataFromStorage('token');
        if (token != '' && token != null && token != undefined && token != 'undefined') {
            arHeaders.Authorization = `Bearer ${token}`;
        }

        req = req.clone({
            headers: new HttpHeaders(arHeaders)
        });
        return next.handle(req).catch(x => this.handleAuthError(x));
    }

}
