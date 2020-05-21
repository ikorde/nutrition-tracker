import { Component, OnInit } from '@angular/core';
import{ HttpClient, HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
import { ParseTreeResult } from '@angular/compiler';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-reccomendations',
  templateUrl: './reccomendations.component.html',
  styleUrls: ['./reccomendations.component.css']
})
export class ReccomendationsComponent implements OnInit {
  results: string[]=[];
  r: [];
  clicked= false; 

  public getReccs() {
    firebase.database().ref("Users/profile/" + firebase.auth().currentUser.uid +"/reccs").on('value', (shapshot) => {
      shapshot.forEach((child) => {
       this.results.push(
        child.val());
     })
    })
    this.clicked = true; 
  }
 
  ngOnInit():void {
  }

}
