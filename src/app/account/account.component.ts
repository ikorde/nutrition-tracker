import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import * as firebase from 'firebase'
import {DashService} from "app/dash.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public CPform:FormGroup;
  public CEform:FormGroup;
  public delform:FormGroup;
   public newPassword:AbstractControl;
   public cNewPassword:AbstractControl;
   public oldPassword:AbstractControl;
   public oldEPassword:AbstractControl;
   public newEchange:AbstractControl;
   public delPassword:AbstractControl;
  op="";
  np="";
  cnp="";
  ope="";
  nee="";
  del="";
  constructor(private fb:FormBuilder,private serivce:DashService,public router:Router) { 
    this.CPform = fb.group({
      'newPassword': ["", Validators.compose([Validators.required,Validators.minLength(6)])],
      'cNewPassword': ["", Validators.compose([Validators.required,Validators.minLength(6)])],
      'oldPassword': ["", Validators.compose([Validators.required,Validators.minLength(6)])],
    });
    this.CEform = fb.group({
      'oldEPassword': ["", Validators.compose([Validators.required,Validators.minLength(6)])],
      'newEchange': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
    });
this.delform=fb.group({
  'delPassword':["", Validators.compose([Validators.required,Validators.minLength(6)])],
})
    this.delPassword = this.delform.controls['delPassword'];
    this.oldEPassword = this.CEform.controls['oldEPassword'];
    this.newEchange = this.CEform.controls['newEchange'];

    this.oldPassword = this.CPform.controls['oldPassword'];
    this.newPassword = this.CPform.controls['newPassword'];
    this.cNewPassword = this.CPform.controls['cNewPassword'];
  }
public deleteUser(values:Object){
firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email,values['delPassword']).then((user)=>{
  firebase.auth().currentUser.delete().then(function() {
      alert("User deleted")
    }).catch(function(error) {
      alert(error);
    });
 }).catch(e=>{
   alert(e);
 })
}
  ngOnInit() {
  }
  public passwordChange(values:Object){
   firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email,values['oldPassword']).then((user)=>{
    firebase.auth().currentUser.updatePassword(this.newPassword.value).then(()=>{
      alert("password changerd");
      this.op="";
      this.np="";
      this.cnp="";
    }).catch(e=>{
      alert(e);
    })
   }).catch(e=>{
     alert(e);
   })
    
  }
  public emailChange(values:Object){
    console.log(values);
    firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email,values['oldEPassword']).then((user)=>{
      firebase.auth().currentUser.updateEmail(values['newEchange']).then(()=>{
        alert("Email successfully changerd");
        this.nee="";
      this.ope="";
      }).catch(e=>{
        alert(e);
      })
     }).catch(e=>{
       alert(e);
     })
   
  }
  public checkMatch(){
    if (this.newPassword.value == this.cNewPassword.value) {
      this.cNewPassword.setErrors(null);
    } else {
      this.cNewPassword.setErrors({ mismatch: true });
    }
  }

}
