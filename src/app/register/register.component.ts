import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,private service : UserService, private T : ToastrService, private route :Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
     
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{4,8}$')]]
      
    })
    
   
    
  }
  add(){
   
    console.log(this.userForm.value)
    this.service.add(this.userForm.value).subscribe((res:any) => {
      console.log(res);
      if(res.status == 123){
        this.T.success("Registration Completed");
        this.cancel();
        this.route.navigateByUrl("/home/login");
        
      }

    })
  }
  cancel(){
    this.userForm.patchValue({
      firstname : "",
      lastname :"",
      email:"",
      password:""
    })
  }
  

}
