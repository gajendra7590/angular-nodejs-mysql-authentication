import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public eventsList = [];
  constructor(private _commonService:CommonService,private _router:Router,private _toastr:ToastrService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
      this._commonService.allEvents().subscribe(
        res => { 
          if( typeof(res.status) && res.status == true ){
            console.log(res.data)
             this.eventsList = res.data
          }else{
          } 
        },
        err => {

        }
      );
  }
}
