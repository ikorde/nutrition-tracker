import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "app/auth.service";
import * as firebase from 'firebase'
@Component({
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss'],
  selector:'login'
})

export class LoginComponent {
  
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  showLoading=false;
  constructor(private fb:FormBuilder,private router:Router, private service:AuthService) {
    this.form = fb.group({
      'email': ["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'password': ["", Validators.compose([Validators.required,Validators.minLength(6)])]
    });
    
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    console.log(values);
    
      firebase.auth().signInWithEmailAndPassword(values['email'],values['password']).then(()=>{

      }).catch((e)=>{
        console.log(e);
        if(e.code=="auth/user-not-found"){
       this.password.setErrors({"auth/unf":true});
        
      }if(e.code=="auth/wrong-password"){
        this.password.setErrors({"auth/pass":true});
       
      }
      })
    
    
    //this.router.navigateByUrl('/dashboard');
  }
}
