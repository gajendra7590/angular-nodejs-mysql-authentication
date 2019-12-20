import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public eventsList = [];

  constructor(private _commonService:CommonService,private _router:Router,private _toastr:ToastrService) { }

  ngOnInit() {
    this.getSpecialEvents();
  }

  getSpecialEvents(){
      this._commonService.specialEvents().subscribe(
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
