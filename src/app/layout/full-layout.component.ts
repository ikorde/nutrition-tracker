import {Component, OnInit} from '@angular/core';
import {DashService} from "app/dash.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls:['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit{
  public username:string;
  public currenUser:firebase.User;
  public toggleBarIcon:boolean=true;
  constructor(private dashService:DashService){
   this.currenUser =firebase.auth().currentUser;
   
  }
  toggle():void{
    let self=this;
    setTimeout(()=>{
      self.toggleBarIcon=!self.toggleBarIcon;

    },500)
  }
 ngOnInit(){
   
 }
 public logout(){
   this.dashService.logout();
   return false;
 }
}
