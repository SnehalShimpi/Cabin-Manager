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

   k : Cabin[] = [];
  constructor(private userService: UserService,
    
    private router: Router) { }

  ngOnInit() {
  var  token = this.userService.getToken();
  var i=0;
  var j=0;
  var k=0;
  this.tk = token;
 // console.log(token);
 this.userService.getCabin().subscribe((cabin  :any) =>{
console.log(cabin.docs)
this.k = cabin.docs;
console.log(this.k)
  this.userService.getBooking(token).subscribe((res : any) => {
    this.booking = res.docs
    console.log(this.booking);
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
  //console.log(cabin.docs);
  
    // for(k=0;k<cabin.docs.length;k++)
    // {
    //   console.log("hiii");
    //   for(i=0;i<res.docs.length;i++){
    //     console.log("bye")
    //     console.log(res.docs[i].name)
    //     if(res.docs[i].name == k){
    //       console.log(res.docs[i].name)
    //      this.k[j] = res.docs[i]
    //     j++;
    //     }
    //    }
    // }
    // console.log("mi k ahe " + this.k);
    // for(i=0;i<res.docs.length;i++){
    //   if(res.docs[i].name == "Cabin_1"){
       
    //   this.Cabin1[j] = res.docs[i]
    //   j++;
    //   }
    //  }

    //  for(i=0,j=0;i<res.docs.length;i++){
    //   if(res.docs[i].name == "Cabin_2"){
    //   this.Cabin2[j] = res.docs[i];
    //   j++;
    //   }
    //  }
    //  for(i=0,j=0;i<res.docs.length;i++){
    //   if(res.docs[i].name == "Cabin_3"){
    //   this.Cabin3[j] = res.docs[i];
    //   j++;
    //   }
    //  }

    //  for(i=0,j=0;i<res.docs.length;i++){
    //   if(res.docs[i].name == "Cabin_4"){
    //   this.Cabin4[j] = res.docs[i];
    //   j++
    //   }
    //  }
    
  
  })
 // console.log(this.Cabin1);
 
})
 

  
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
