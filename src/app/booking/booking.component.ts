import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import{Cabin} from '../booking'
import{User, Object1} from '../user';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  userForm: FormGroup;
  
  bsvalue : any;
   token1 : any;
   email :any;
   Cabins : Cabin[] = [];
   today = new Date();
   flag = false;
   name1 : any;
   obj = new Object1();
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
   console.log(this.token1)
    this.service.firstname(this.token1).subscribe((res : any) => {console.log( res)
    this.email = res.docs;

    console.log(this.email);
    });

    this.service.getCabin().subscribe((res : any)=> {console.log(res)
    console.log(res.docs[0])
    this.Cabins = res.docs;
    console.log(this.Cabins);
    });

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
       console.log(this.obj)
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
        //console.log(CabinName)
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


    // this.service.getCabin().subscribe((res : any)=> {console.log(res)
    //   console.log(res.docs[0])
    //   var i =0 ;
     
    //     this.userForm.get('endTime').valueChanges.subscribe(endTime => {
    //     console.log(endTime);
    //     var CabinName = this.userForm.get('name').value;
    //     var Stime = this.userForm.get('startTime').value;
    //     var Etime = this.userForm.get('endTime').value;
    //       for(i=0;i<res.docs.length;i++){

    //         if(res.docs[i].cabin === CabinName && 
    //            res.docs[i].startTime ===  Stime && 
    //            res.docs[i].endTime === Etime ){
    //            this.flag = true;
    //            console.log(this.flag);
    //             break;
                    
    //         }
    //         else if(Stime === res.docs[i].startTime &&  
    //                 Etime <= res.docs[i].endTime ){
    //              this.flag = true;
    //              console.log("inside third if");
    //               break;

    //              }


    //       else if (Stime >= res.docs[i].startTime &&
    //                Stime <= res.docs[i].endTime &&
    //                Etime >= res.docs[i].endTime) {
    //           this.flag = 1;
    //           console.log("inside second if");
    //           break;
    //  }
            
    //         else{
    //           this.flag = false;
    //           break;
    //         }
           
    //     }
    //   })
   
    
    // });
   
  }

  save(){
    console.log(this.email);
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
        // this.service.Mail(this.token1).subscribe(res => {console.log(res)});
        
        //this.cancel();
        this.router.navigateByUrl("/dashboard");
       
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
