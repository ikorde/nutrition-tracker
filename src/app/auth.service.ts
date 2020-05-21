import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  constructor(private router:Router) { 
    firebase.auth().onAuthStateChanged((state)=>{
      if(state){
        console.log(state);  
        this.router.navigateByUrl('/dashboard');
      }else{
        console.log("User not found.");
      }
    })
  }

  
  async signup(email:string,password:string,username:string){
   await   firebase.auth().createUserWithEmailAndPassword(email,password).then(async(user)=>{
        await  user.user.updateProfile({
            displayName:username,
            photoURL:"https://firebasestorage.googleapis.com/v0/b/healthwebapp-cfd26.appspot.com/o/64572.png?alt=media&token=7e7dac8f-2c2e-4609-822f-85ccd4392751"
          }).then(()=>{
             
          }).catch(e=>{
            alert(e);
          })
      }).catch(e=>{
        alert(e);
      })
  }
  sendRestEmail(email:string){
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
      alert("Password reset email send successfully");
    }).catch(e=>{
      alert(e);
    })
  }
 
}
