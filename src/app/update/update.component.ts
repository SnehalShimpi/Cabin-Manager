import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{DatePipe} from '@angular/common';
import{Cabin} from '../booking';
import{User, Object1} from '../user';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public _id = String;
  userForm: FormGroup;
  Cabins : Cabin[] = [];
  today = new Date();
  obj = new Object1();
  public flag = null;
  constructor(private service:UserService,private route: Router ,
    private Route : ActivatedRoute,
    private fb : FormBuilder,
    private T : ToastrService,
    private datePipe : DatePipe
   ) { }

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
    var token = this.service.getToken();
    this.Route.params.subscribe(params =>{
      this._id = params['id'];
      //console.log(this._id);
    });

    this.service.getCabin().subscribe((res : any)=> {console.log(res)
      console.log(res.docs[0])
      this.Cabins = res.docs;
      console.log(this.Cabins);
      });
    this.service.GetUserById(this._id,token).subscribe((res : any) => {
    
    console.log(res);
   
     //console.log(date)
      this.userForm.patchValue({
        name:res.doc.name,
        purpose:res.doc.purpose,
        date:this.datePipe.transform(res.doc.date,'MM/dd/yyyy'),
        startTime:res.doc.startTime,
        endTime:res.doc.endTime
      })
      
    })
    this.onChanges();

  }
  onChanges(){

    this.userForm.get('name').valueChanges.subscribe(endTime => {
         
      this.obj.cabin = this.userForm.get('name').value;
      this.obj.startTime =  this.userForm.get('startTime').value;
      this.obj.endTime = this.userForm.get('endTime').value;
      console.log(this.obj)
     
      this.service.findReserved(this.obj).subscribe((res : any) => {
        console.log(res);
        if(res.status == true){
          this.flag = true;
        }
        else{
          this.flag = false;
        }
      });
    })

    this.userForm.get('startTime').valueChanges.subscribe(endTime => {
         
      this.obj.cabin = this.userForm.get('name').value;
      this.obj.startTime =  this.userForm.get('startTime').value;
      this.obj.endTime = this.userForm.get('endTime').value;
      console.log(this.obj)
     
      this.service.findReserved(this.obj).subscribe((res : any) => {
        console.log(res);
        if(res.status == true){
          this.flag = true;
        }
        else{
          this.flag = false;
        }
      });
    })
   
    this.userForm.get('endTime').valueChanges.subscribe(endTime => {
     
      this.obj.cabin = this.userForm.get('name').value;
      this.obj.startTime =  this.userForm.get('startTime').value;
      this.obj.endTime = this.userForm.get('endTime').value;
      console.log(this.obj)
     
     
      this.service.findReserved(this.obj).subscribe((res : any) => {
        console.log(res);
        if(res.status == true){
          this.flag = true;
        }
        else{
          this.flag = false;
        }
      });
    })
  }

  Update(){
   //console.log(this.userForm.value);
     this.service.UpdateBooking(this._id,this.userForm.value).subscribe((res : any) =>{
       console.log(res);
       if(res.status == true){
         this.T.success("successfully Updated record");
         //this.cancel();
         this.route.navigateByUrl("/dashboard");
       }
       else {
       console.log("false");
      this.T.error("Not Updated record","Already Booked");
        // this.cancel();
        // this.route.navigateByUrl("/dashboard");
      }
     });
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
