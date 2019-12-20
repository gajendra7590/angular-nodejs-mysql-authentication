import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth:AuthService,private router:Router,private _toastr:ToastrService) { }

  ngOnInit() {
    this.userLogout();
  }

  removeToken(){
     localStorage.removeItem("token");
     localStorage.removeItem("auth_data");
  }
  
  userLogout(){
    this._auth.logOutUser().subscribe(
      res => {
        console.log(res)
        if (typeof (res.status) != 'undefined' && res.status == true) { 
          this._toastr.success("You have successfully logged out","Logged Out Alert!");
          this.removeToken(); 
          this.router.navigate(['/home']);
        } else if (typeof (res.status) != 'undefined' && res.status == false) {
          this.removeToken(); 
          this._toastr.success(res.message,"Logged out alert!")
          this.router.navigate(['/home']);
        }
      },
      err => {
         if( (typeof(err.status)!='undefined') && (err.status == 401) ){
           this.removeToken(); 
           this._toastr.error('Your session has been expired',"LogOut Alert!")
           this.router.navigate(['/home']); 
         }else{
           this.removeToken(); 
           this._toastr.error('Facing error in logged out',"LogOut Alert!")
           this.router.navigate(['/home']); 
         }          
      }
    );

  }

}
