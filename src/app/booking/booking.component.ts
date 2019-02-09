import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  userForm: FormGroup;
  bsvalue : any;
   token1 : any;
   today = new Date();
  constructor(private fb: FormBuilder,private service : UserService , private T : ToastrService,private router : Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      purpose: ['', Validators.required],
     
      date: ['', [Validators.required]],

      startTime: ['', [Validators.required]],
      endTime : ['',[Validators.required]],
      firstname : [''],
      token : this.service.getToken()
      
    })
    this.token1 =this.userForm.get("token").value;
   // console.log(this.token1)
    this.service.firstname(this.token1).subscribe(res => {console.log( res)});
    

  }

  save(){
   
    console.log(this.userForm.value);
    this.service.book(this.userForm.value).subscribe((res : any )=> {
      console.log(res);
      console.log(res.status);
      if(res.status == 1 || res.status == 3){
        this.T.error("Cabin Already Book","please Select another date or time");
        console.log("already booked")
      }
      
      else if(res.status == 123){
        this.T.success("Cabin booked Successfully");
        // this.cancel();
        // this.router.navigateByUrl("/dashboard");
       
      }
      
    })
  }
  logOut() {
    this.service.logout();
    this.router.navigateByUrl('home/login');

  }
  cancel(){
    this.userForm.patchValue({
      name:"",
      purpose:"",
      date:"",
      startTime:"",
      endTime:""
    })
  }

}
