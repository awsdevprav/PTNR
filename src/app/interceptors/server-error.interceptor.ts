import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Utility from '../utilities/utility';
// import { ProfileService } from './../services/user/profile.service';
import { Path } from '../core/enums';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        // private profileService: ProfileService
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retry(0),
            catchError((error: HttpErrorResponse) => {
                if ([401, 403].includes(error.status)) {
                    debugger;
                    //Utility.clearLocalStorage();
                    //this.router.navigateByUrl(Path.Auth);
                    return throwError(error);
                } else if (error.status === 500) {
                    debugger;
                    this.router.navigateByUrl('/internal-server-error');
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
