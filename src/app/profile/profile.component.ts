import { Component } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import * as firebase from 'firebase'
import {DashService} from "app/dash.service";
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
   userEmail="";
   userName="";
   heightPlaceHolder="height in cm";
   weightPlaceHolder="weight in kg";
   photoUrl="https://www.thun.com/static/version1560767400/frontend/Thun/default/en_US/images/loader-3.gif";
   progress=0;
   public form:FormGroup;
   public profileForm:FormGroup;
   public unit:AbstractControl;
   public weight:AbstractControl;
   public height:AbstractControl;
   public age:AbstractControl;
   public profileWeight:AbstractControl;
   public profileHeight:AbstractControl;
   public profileBmi:AbstractControl;
   public profileGoal: AbstractControl;
   public profileGoalDescription:AbstractControl;
   bmi:number;

  constructor(private fb:FormBuilder,private serivce:DashService,public router:Router) { 
    this.form = fb.group({
      'weight': ["", Validators.compose([Validators.required,])],
      'height': ["", Validators.compose([Validators.required])],
      'unit': ["", Validators.compose([Validators.required])],
    
    });
    this.profileForm=fb.group({
      'age': ["", Validators.compose([Validators.required])],
      'profileWeight': ["", Validators.compose([Validators.required])],
      'profileHeight': ["", Validators.compose([Validators.required])],
      'profileBmi': ["", Validators.compose([Validators.required])],
      'profileGoal': ["", Validators.compose([Validators.required])],
      'profileGoalDescription': ["", Validators.compose([Validators.required])]
    })
   
    this.weight = this.form.controls['weight'];
    this.height = this.form.controls['height'];
    this.unit = this.form.controls['unit'];
    this.age = this.profileForm.controls['age'];
    this.profileHeight = this.profileForm.controls['profileHeight'];
    this.profileWeight = this.profileForm.controls['profileWeight'];
    this.profileGoal = this.profileForm.controls['profileGoal'];
    this.profileGoalDescription = this.profileForm.controls['profileGoalDescription'];
    this.profileBmi = this.profileForm.controls['profileBmi'];
    
   setTimeout(() => {
    serivce.ngOnInit()
    this.userEmail=serivce.userEmail;
    this.userName=serivce.userName;
    this.photoUrl=serivce.photoUrl;
    firebase.database().ref('Users/profile/'+firebase.auth().currentUser.uid).once('value').then((snp)=>{
      console.log(snp.val());
      this.age.setValue(snp.val().age);
      this.profileBmi.setValue(snp.val().profileBmi);
      this.profileGoal.setValue(snp.val().profileGoal);
      this.profileGoalDescription.setValue(snp.val().profileGoalDescription);
      this.profileHeight.setValue(snp.val().profileHeight);
      this.profileWeight.setValue(snp.val().profileWeight);
    }).catch(e=>{
      console.log(e);

    })
   }, 2000);   
  }
  public submitProfile(values:Object){
    firebase.database().ref('Users/profile/'+firebase.auth().currentUser.uid).set(values).then(()=>{
      alert("Updated successfully");
    }).catch(e=>{
      console.log(e);

    })
  }
  public onSubmit(values:Object){
        if(values['unit']=="Metric"){
            this.bmi=values['weight']/((values['height']/100)*2);
        }
        if(values['unit']=="Imperial"){
          this.bmi=(values['weight']/(values['height']*values['height']))*703;
        }
  }
  public changeUnits(value:any){
    var selection=(value.target.value);
    if(selection=="Imperial"){
      this.heightPlaceHolder="height  (in)";
      this.weightPlaceHolder="weight (lb)";
    }else{
      this.heightPlaceHolder="height in cm";
      this.weightPlaceHolder="weight in kg";
    }
  }
 public updateProfile(event){
    var file=event.srcElement.files["0"];
    var storageRef= firebase.storage().ref('ProfileImages')
    var uploadTask = storageRef.child(Date.now().toString()).put(file);
      uploadTask.on('state_changed', (snapshot)=>{
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.progress=percentage;
        if(percentage==100){
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
            this.photoUrl=downloadURL;
            firebase.auth().currentUser.updateProfile({
            photoURL:downloadURL
            }).then(()=>{
              alert("Profile Updated successfully");
            })
          });
        }
      })     
}

public updateName(){
  
  firebase.auth().currentUser.updateProfile({
    displayName:this.userName
  }).then(()=>{
    alert("name updated");
  }).catch(e=>{
    alert(e);
  })
}
}
