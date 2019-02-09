import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{Router,RouterModule} from '@angular/router'; 
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb : FormBuilder,private service : UserService , private router : Router, private T : ToastrService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
    
  });
  if(this.service.isLoggedIn()){
    this.router.navigateByUrl('dashboard');
  }
  }
  login(){
   
    this.service.login(this.loginForm.value).subscribe((res : any) =>{
      console.log(res);
      if(res.status == true){
        this.T.success("login successfully");
        this.service.sendToken(res.token)
        this.router.navigate(['dashboard']);
        
      }
      if(res.status == false){
        this.T.error("Authentication failed" , "Please try again")
      }
    })
  }
  cancel(){
    this.loginForm.patchValue({
      email:'',
      password:"",
    })
  }
  

}
