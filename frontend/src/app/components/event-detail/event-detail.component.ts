import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  public eventsDetail = [];
  public similarEvents = [];
  public popularEvents = []; 
  public event_id = 0;

  constructor(private _commonService:CommonService,private _router:Router,private _toastr:ToastrService,private _activeRoute:ActivatedRoute) { }

  ngOnInit() { 
    this._activeRoute.paramMap.subscribe( params => {
      this.event_id = parseInt(params.get("id"));  
      this.getSpecialEvents();
    });     
  }

  getSpecialEvents(){         
      this._commonService.eventDetail(this.event_id).subscribe(
        res => { 
          if( typeof(res.status) && res.status == true ){
             console.log(res)
             this.eventsDetail = res.data[0];
             this.similarEvents = res.similars;
             this.popularEvents = res.mostPopular;
          }else{
            this._toastr.error(res.message,"Invalid event id");
            this._router.navigate(["/home"]); 
          } 
        },
        err => { 
        }
      );
  }

}
