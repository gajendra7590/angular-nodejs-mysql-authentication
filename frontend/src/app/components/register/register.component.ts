import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  }

  public alertMsg = "";
  public alertClass = 'alert-success';
  public alertIsTrue = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  successAlert() {
    this.alertMsg = 'You have registered successfully';
    this.alertClass = 'alert-success';
    this.alertIsTrue = true;
    setTimeout(() => { this.alertIsTrue = false; }, 2000);
  }

  errorAlert(response) {
    this.alertMsg = '';
    if(response.error!=''){
      this.alertMsg = response.error;
    }else if(response.message!=''){
      this.alertMsg = response.message;
    }else{
      this.alertMsg = 'Something went wrong in registration';
    } 
    this.alertClass = 'alert-danger';
    this.alertIsTrue = true;
    setTimeout(() => { this.alertIsTrue = false; }, 2000);
  }


  registerSubmit() {
    this._auth.registerUser(this.registerFormData).subscribe(
      res => {
        console.log(res)
        if (typeof (res.status) != 'undefined' && res.status == true) {
          localStorage.setItem("token", res.auth_data.access_token);
          localStorage.setItem("auth_data", res.auth_data);
          this.successAlert();
          setTimeout(() => { this.router.navigate(['/home']) }, 1000);
        } else if (typeof (res.status) != 'undefined' && res.status == false) {
          this.errorAlert(res);
        }
      },
      err => {
        console.log(err)
        this.errorAlert('');
      }
    );
  }

}
