import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
 public _id = String;
  constructor(private service : UserService,private route : Router,
    private Route:ActivatedRoute,
    private T : ToastrService) { }

  ngOnInit() {
    this.Route.params.subscribe(params =>{
      this._id = params['id'];
      console.log(this._id);
    });
 
  }
  Delete(){
   var token = this.service.getToken();
    this.service.DeleteBooking(this._id,token).subscribe((res : any) =>{
      console.log(res)
      if(res.status == true){
        this.T.warning("Successfully Deleted Booking");
        this.route.navigateByUrl("/dashboard");
      }
    });
  }

}
