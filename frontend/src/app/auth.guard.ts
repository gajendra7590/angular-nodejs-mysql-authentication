import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authSerive: AuthService, private _router: Router,private _toastr:ToastrService) { }

  canActivate():boolean{
     if( this._authSerive.isLoggedIn()){
        return true;
     } else {
        this._toastr.error("You are not authorised to access.");
        this._router.navigate(['/login']);
        return false;
     }
  }

}
