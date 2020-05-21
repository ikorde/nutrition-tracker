import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class DashService implements OnInit {
  public userEmail:string;
  public userName:string;
  public photoUrl:string;
  public uploadProgress:number;
 

  constructor(private router:Router) {

    firebase.auth().onAuthStateChanged((state)=>{
      if(state){
        console.log(state);  
        this.userEmail=state.email;
        this.userName=state.displayName;
        this.photoUrl=state.photoURL;
        
      }else{
        this.router.navigateByUrl('/login');
      }
    })
   }
   
   ngOnInit() {
    
   }
    changeProfile(file):any{
     console.log(file);
  
   }

   logout(){
    firebase.auth().signOut();
    return false;
  }
}
