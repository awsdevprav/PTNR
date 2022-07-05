import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = state.url;

    let data = route.data;
    return this.checkLogin(url, data);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.canActivate(route, state);

  }

  checkLogin(url: any, data: any) {
    let tok = localStorage.getItem('token')
    if (tok) {
      // let localroutes = ((localStorage.getItem('userType')))
      // const hasPermission = (localroutes === data.id) ? 1 : 0;
      // if (data.id == 2) {
        return true;
      // }
      //     console.log(hasPermission.length,"=djklsjldkjsklj")
      // if (hasPermission == 1) {
      //   // logged in so return true
      //   // console.log("checkeddddddddddddddddddddddddddddddd")
      //   return true;
      // } else if (hasPermission == 0) {
      //   return false;
      // }
    }
    // console.log(" )
    this.router.navigate(['/'], { queryParams: { attemptedUrl: url } });
    return false;
  }

  canDeactivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot){
      if(!localStorage.getItem('token')){
        return false;
      }else{
        return true;
      }
  }
}


