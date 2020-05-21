import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  recipeArray=[];
  recipeforButton=[];
  showRecipe=false;
  showFreqMealorHist=false;
  
  public form:FormGroup;
  public selectedDate:AbstractControl;
  maxDate="";
  showNotFound=false;
  foods=[];
  constructor(private fb:FormBuilder) { 
    this.form = fb.group({
      'selectedDate': ["", Validators.compose([Validators.required])]
    });
    this.selectedDate=this.form.controls['selectedDate'];
    var d=new Date();
    var year=d.getFullYear();
    var date=d.getDate().toString();
    if(parseInt(date)<10){
      date="0"+date;
    }
    var month=(d.getMonth()+1).toString();
    if(parseInt(month)<10){
      month="0"+month;
    }
    var cdate=(year+"-"+month+"-"+date);
    this.selectedDate.setValue(cdate);
    this.maxDate=cdate;
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.onSubmit({"selectedDate":cdate});

      }
    })
  }
  loadFrequent(){
    this.showFreqMealorHist=true;
    this.showRecipe=false;
   
    firebase.database().ref("Users/freq_meals/"+firebase.auth().currentUser.uid).once('value',(snp)=>{
      this.foods=[];
      for(var key in snp.val()){
      var fId=(snp.val()[key].foodID);
      console.log(fId);
      firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+this.selectedDate.value+"/"+fId).update(snp.val()[key]).then(()=>{
        console.log("Updated in database"); 
        }).catch(e=>{
          alert(e);
        })
          
      }
      
      if(snp.val()==null){
        this.showNotFound=true;
      }else{
        this.showNotFound=false;
      }
        
        this.onSubmit({selectedDate:this.selectedDate.value});
        alert("Frequent meals successfully added in selection....");
    }).catch(e=>{
      alert(e);
    })
  }

  loadRecipes() {
    this.showFreqMealorHist=false;
    this.showRecipe=true;
    var data=[];
    firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid).orderByKey().once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if(key !="") {
          data.push({name: key});
        }
        childSnapshot.forEach(function(childSnapshot) {
          var ingredObj = childSnapshot.key;
          if(ingredObj !="") {
            data.push({array: ingredObj})
          }
          var ingred = childSnapshot.val();
          if(ingred.ingredientDescription !="") {
            data.push({ingredients: ingred.ingredientDescription}) 
          }
          childSnapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(childSnapshot) {
              var nutrient = childSnapshot.val();
              if(nutrient.name!="") {
                data.push({nutrientName: nutrient.name});
              }
              if(nutrient.name!="") {
                data.push({nutrientUnit: nutrient.unit});
              }
              if(nutrient.name!="") {
                data.push({nutrientName: nutrient.value});
              }
            })
          })
        })
      })
    })
    this.recipeArray=data;
  }

  recipeGenerate() {
    var data=[];
    firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid).orderByKey().once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var recipeName = childSnapshot.key;
          data.push({name: recipeName});
      })
    })
    this.recipeforButton=data;
  }

  markAsEat(event){
   
    this.foods.find(o=>{
      if(o.foodID==event.target.id){
        firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+this.selectedDate.value+"/"+event.target.id).update({isEated:true}).then(()=>{
            console.log("Updated in database"); 
            o.isEated=true;
        }).catch(e=>{
          alert(e);
        })
      }else{
      
      }
    });
  }

  markAsEatRecipe(event){
   
    this.recipeArray.find(o=>{
      if(o.foodID==event.target.id){
        firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid+"/"+event.target.id).update({isEated:true}).then(()=>{
            console.log("Updated in database"); 
            o.isEated=true;
        }).catch(e=>{
          alert(e);
        })
      }else{
      
      }
    });
  }

  deleteFood(event){
    this.foods.find(o=>{
      if(o.foodID==event.target.id){
        firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+this.selectedDate.value+"/"+event.target.id).remove().then(()=>{
           
            this.foods.splice(this.foods.findIndex(x => x == o), 1);
            
        }).catch(e=>{
          alert(e);
        })
      }else{
      
      }
    });
  }
  onSubmit(value:Object){
    this.showFreqMealorHist=true;
    this.showRecipe=false;
    this.foods=[];
    firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+value['selectedDate']).once('value',(snp)=>{
    
      for(var key in snp.val()){
       this.foods.push(snp.val()[key]);
          
      }
      
      if(snp.val()==null){
        this.showNotFound=true;
      }else{
        this.showNotFound=false;
      }
    }).catch(e=>{
      alert(e);
    })
  }
  myFunction(item,index){
    console.log(item);
    console.log(index);
  }
  ngOnInit() {
  }

}
