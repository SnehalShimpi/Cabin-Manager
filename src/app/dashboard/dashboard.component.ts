import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{Booking} from '../booking';
import{Cabin} from '../booking'
import { Router, RouterModule } from '@angular/router';
import{User} from '../user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flag ;
  id;
  tk;
  booking : Booking[];
  user : User[];
  Cabin1 : Cabin[]= [];
  Cabin2 : Cabin[] = [];
  Cabin3 : Cabin[] = [];
  Cabin4 : Cabin[] = [];
  
  constructor(private userService: UserService,
    
    private router: Router) { }

  ngOnInit() {
  var  token = this.userService.getToken();
  var i=0;
  var j=0;
  this.tk = token;
 // console.log(token);
  this.userService.getBooking(token).subscribe((res : any) => {
    this.booking = res.docs
    console.log(res.docs);
    this.userService.userInfo(token).subscribe((res1: any)=> {
      console.log(res1.user.firstname);
      this.user = res1.user;
     
   
    for(i=0;i<res.docs.length;i++){
     if(res.docs[i].firstname == res1.user.firstname){
      this.flag = true;
      console.log(this.flag);

     }
    }
  })
  
    for(i=0;i<res.docs.length;i++){
      if(res.docs[i].name == "cabin_1"){
      this.Cabin1[j] = res.docs[i]
      j++;
      }
     }

     for(i=0,j=0;i<res.docs.length;i++){
      if(res.docs[i].name == "cabin_2"){
      this.Cabin2[j] = res.docs[i];
      j++;
      }
     }
     for(i=0,j=0;i<res.docs.length;i++){
      if(res.docs[i].name == "cabin_3"){
      this.Cabin3[j] = res.docs[i];
      j++;
      }
     }

     for(i=0,j=0;i<res.docs.length;i++){
      if(res.docs[i].name == "cabin_4"){
      this.Cabin4[j] = res.docs[i];
      j++
      }
     }
    
  
  })
  console.log(this.Cabin1);
 
 
 

  
  }
 
  login() {
    console.log("inside login");

    this.router.navigateByUrl('dashboard');
  }
  logOut() {
    this.userService.logout();
    this.router.navigateByUrl('home/login');

  }
  Delete(){
    this.userService.DeleteBooking(this.id,this.tk).subscribe((res : any)=>{
  console.log(res);
    })
  }
 

}
