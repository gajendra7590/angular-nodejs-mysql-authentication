import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public eventsList = [];

  constructor(private _commonService:CommonService,private _auth:AuthService,private _router:Router,private _toastr:ToastrService) { }

  ngOnInit() {
    this.getSpecialEvents();
  }

  getSpecialEvents(){
      this._commonService.specialEvents().subscribe(
        res => { 
          if( typeof(res.status) && res.status == true ){
             console.log(res.data)
             this.eventsList = res.data
          } 
        },
        err => { 
          if(err instanceof HttpErrorResponse){
            if(err.status == 401){
               this._auth.removeToken();
               this._toastr.error("Your session has been expired","401 UnAuthorised");
               this._router.navigate(["/login"]);
            }
          } 
        }
      );
  }

}
