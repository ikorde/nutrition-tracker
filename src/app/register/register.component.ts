import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from "./register.service";
import * as firebase from 'firebase'
import { AuthService } from 'app/auth.service';


@Component({
  templateUrl: './register.component.html',
  selector:'register'
})
export class RegisterComponent {

  public form:FormGroup;
  public name:AbstractControl;
  
  public email:AbstractControl;
  public password:AbstractControl;
  public cpassword:AbstractControl;
  public submitted:boolean = false;

  constructor(private fb:FormBuilder,private router:Router, private service:AuthService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'password': ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      'cpassword': ['', Validators.compose([Validators.required])]
      
    });
    this.name= this.form.controls['name'];
   
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.cpassword = this.form.controls['cpassword'];
    
  } 
  public checkMatch(){
    if (this.cpassword.value == this.password.value) {
      this.cpassword.setErrors(null);
    } else {
      this.cpassword.setErrors({ mismatch: true });
    }
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    console.log(values);
    this.service.signup(values['email'],values['password'],values['name']);
  }

}
