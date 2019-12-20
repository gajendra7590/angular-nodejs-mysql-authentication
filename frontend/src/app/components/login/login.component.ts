import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormData = {
    email: "",
    password: ""
  }

  public alertMsg = "";
  public alertClass = 'alert-success';
  public alertIsTrue = false;

  constructor(private _auth: AuthService, private router:Router, private actRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  successAlert() {
    this.alertMsg = 'You have logged in successfully';
    this.alertClass = 'alert-success';
    this.alertIsTrue = true;
    setTimeout(() => { this.alertIsTrue = false; },2000);
  }

  errorAlert(msg = '') {
    this.alertMsg = (msg != '') ? msg : 'Opps something went wrong';
    this.alertClass = 'alert-danger';
    this.alertIsTrue = true;
    setTimeout(() => { this.alertIsTrue = false; }, 2000);
  }

  loginSubmit() {
    this._auth.loginUser(this.loginFormData).subscribe(
      res => {
        console.log(res)
        if (typeof (res.status) != 'undefined' && res.status == true) {
          localStorage.setItem("token", res.auth_data.access_token);
          localStorage.setItem("auth_data", res.auth_data);
          this.successAlert();
          setTimeout(() => { this.router.navigate(['/home'])   }, 1000);
        } else if (typeof (res.status) != 'undefined' && res.status == false) {
          this.errorAlert(res.message);
        }
      },
      err => {
        console.log(err)
        this.errorAlert();
      }
    );
  }

}
