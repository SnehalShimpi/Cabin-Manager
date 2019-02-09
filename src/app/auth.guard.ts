import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {CanActivate ,Router,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import{UserService}from './user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service : UserService , private Router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if(this.service.isLoggedIn()){
        return true;
      }
      else{
        this.Router.navigate(["home/login"]);
        return false;
      }
  
    
  }
  
}
