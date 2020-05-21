
import {Component, OnInit} from '@angular/core';
import{ HttpClient} from "@angular/common/http";
import * as firebase from "firebase";
import { ParseTreeResult } from '@angular/compiler';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  templateUrl: './dashboard.component.html',
  selector:'dashboard',
  styleUrls:['./dashboard.scss']
})
export class DashboardComponent implements OnInit{
 
   foods=[];
   foodDetail=[];
   nextPage=2;
   serachText="";
   isNextDisable=false;
   noFoodFound=false;
   showAddMealBtn=false;
   alreadyAddedMeal=false;
   slectedMealDescription="";
   slectedFood="";
   hasFoods=false;
   hasDetail=false;
   showAddMealFrequentBtn=false;
   alreadyAddedFrequentMeal=false;
   showAddMealPrevBtn=false;
   alreadyAddedPrevMeal=false;
   showRecipe=true;
   alreadyAddedRecipe=false;
   showAddRecipeBtn=false;
   showForm=true;
   recipeName="";
   recipeArray=[];
   test=[];
   currdata=[];
   total0=0;
   total1=0;
   total2=0;
   total3=0;
   total4=0;
   total5=0;
   total6=0;
   total7=0;
   total8=0;
   total9=0;
   total10=0;
   total11=0;
  
  public form:FormGroup;
  public selectedDate:AbstractControl;
  maxDate="";
  showNotFound=false;
  constructor(private http:HttpClient, fb:FormBuilder){
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

  onSubmit(value:Object){
    this.showRecipe=false;
    this.foods=[];
    firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+value['selectedDate']+"/"+this.slectedFood).update({foodID:this.slectedFood}).then(()=>{
      this.showAddMealPrevBtn=true;
      // this.alreadyAddedPrevMeal=false;
    }).catch(e=>{
      alert(e);
    })
  }

  public setName(e){
    this.serachText=e.target.value;
  }
public  onKeydown(event){
  
  this.nextPage=2;
  if (event.key === "Enter") {
    
   this.http.post("https://us-central1-healthwebapp-cfd26.cloudfunctions.net/SearchFoodsByName",
    {
      "generalSearchInput":this.serachText       
    }).subscribe(
      res => {
        this.hasFoods=true;    
        var data=(res['foods']);
       
        if(data['length']==0){
          this.foods=(data);
          this.noFoodFound=true;
          this.isNextDisable=false;
        }else{
          this.foods=(data);
          this.noFoodFound=false;
          this.isNextDisable=true;
        }
      },
      err => {
        console.log("Error occured",err);
      }
    );
  }
}
public loadMore(event){
  this.http.post("https://us-central1-healthwebapp-cfd26.cloudfunctions.net/SearchFoodsNextPage",
    {
      "generalSearchInput":this.serachText,
      "pageNumber":event.target.id

    }).subscribe(
      res => {
        var data=(res['foods']);
       
        for(var key in data){
          this.foods.push(data[key]);
        }
        this.nextPage=this.nextPage+1;
        this.isNextDisable=true;
      },
      err => {
        console.log("Error occured",err);
      }
    );
}
public showDetail(event){
  this.http.post("https://us-central1-healthwebapp-cfd26.cloudfunctions.net/getFoodDetailById",{
    "id":event.target.id
  }).
  subscribe(res=>{
    this.hasDetail=true;
   
    this.slectedFood=event.target.id;
    var data=[];
    this.slectedMealDescription=res['description'];
    this.showAddMealBtn=false;
    this.alreadyAddedMeal=false;
    this.showAddMealFrequentBtn=false;
    this.alreadyAddedFrequentMeal=false;
    if(res['labelNutrients']!=undefined){
        for(var name in res['labelNutrients']){
          var name=name;
          var value=res['labelNutrients'][name].value;
          var unit=""
          data.push({name:name,value:value,unit:unit})
        }
        data.push({name:"Serving Size",value:res['servingSize'],unit:""})
        data.push({name:"Serving Size Unit",value:res['servingSizeUnit'],unit:""})
    }else{
      for(var key in res['foodNutrients']){
        if(key!=undefined){     
          var amount=res['foodNutrients'][key].amount;
          var name=res['foodNutrients'][key].nutrient['name'];
          var unitName=res['foodNutrients'][key].nutrient['unitName'];
          data.push({name:name,value:amount,unit:unitName})
        }  
      }
    }
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
   firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+cdate+"/"+this.slectedFood).once('value',(snp)=>{
    if(snp.val()==null){  
      this.showAddMealBtn=true;
      this.showAddRecipeBtn=true;
    }else{
      this.alreadyAddedMeal=true;
    }
    
   })
   firebase.database().ref("Users/freq_meals/"+firebase.auth().currentUser.uid+"/"+this.slectedFood).once('value',(snp)=>{
    if(snp.val()==null){  
      this.showAddMealFrequentBtn=true;
    }else{
      this.alreadyAddedFrequentMeal=true;
    }
  });
   
    this.foodDetail=data;

    
  },err=>{
console.log(err);
  })
}
public addMeanlFrequent(){
  firebase.database().ref("Users/freq_meals/"+firebase.auth().currentUser.uid+"/"+this.slectedFood).update({foodID:this.slectedFood}).then(()=>{
    this.showAddMealFrequentBtn=false;
    this.alreadyAddedFrequentMeal=true;
  }).catch(e=>{
    alert(e);
  })
}
public addMeanlForToday(){
 
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
  firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+cdate+"/"+this.slectedFood).update({foodID:this.slectedFood}).then(()=>{
    this.showAddMealBtn=false;
    this.alreadyAddedMeal=true;
  }).catch(e=>{
    alert(e);
  })
  
}
public getSearchedResults(){
  this.nextPage=2;
  
   this.http.post("https://us-central1-healthwebapp-cfd26.cloudfunctions.net/SearchFoodsByName",
    {
      "generalSearchInput":this.serachText       
    }).subscribe(
      res => {
       
        var data=(res['foods']);
       
        if(data['length']==0){
         
          this.foods=(data);
          this.noFoodFound=true;
          this.isNextDisable=false;
        }else{
          this.foods=(data);
          this.noFoodFound=false;
          this.isNextDisable=true;
        }
       
      },
      err => {
        console.log("Error occured",err);
      }
    );
}

public addRecipe() {
  this.showRecipe=false;
  var data=[];
  firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid).orderByKey().once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      data.push({name: key});
    })
  })
  this.recipeArray=data;
}

public formAvail() {
  this.showForm=false;
}

public setRecipeName(e){
  this.recipeName=e.target.value;
}

public createRecipe(event) {
  
  if (event.key === "Enter") {
    
    firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid+"/"+this.recipeName+"/"+this.slectedFood).update({
      foodID:this.slectedFood, 
      ingredientDescription:this.slectedMealDescription,
      foodNutrients:this.foodDetail
    }).then(()=>{
      this.showAddRecipeBtn=false;
      this.alreadyAddedRecipe=true;
      alert("Recipe has been created");
      this.showForm=true;
      this.showRecipe=true;
      this.showAddRecipeBtn=true;
      this.alreadyAddedRecipe=false;
    }).catch(e=>{
      alert(e);
    })
  }
}

public addRecipeIngredient(event) {
  this.recipeName=event;
  firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid+"/"+this.recipeName+"/"+this.slectedFood).update({
    foodID:this.slectedFood, 
    ingredientDescription:this.slectedMealDescription,
    foodNutrients:this.foodDetail
  }).then(()=>{
    this.showAddRecipeBtn=false;
    this.alreadyAddedRecipe=true;
    alert("Ingredient has been added to recipe");
    this.showForm=true;
    this.showRecipe=true;
    this.showAddRecipeBtn=true;
    this.alreadyAddedRecipe=false;
  }).catch(e=>{
    alert(e);
  })

}

// adding recipe to today's meal
public addRecipetoTodaysMeal(event) {
  var data=[];
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
  this.recipeName = event.target.id;
  var cdate=(year+"-"+month+"-"+date);
  firebase.database().ref("Users/recipes/"+firebase.auth().currentUser.uid+"/"+this.recipeName).once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot);
      console.log(childSnapshot.val().foodID);
      data.push({IDs: childSnapshot.val().foodID, descriptions: childSnapshot.val().ingredientDescription});
      //data.push({nutrients: childSnapshot.val().foodNutrients});
    })
  }).then(()=>{
    console.log(data);
  for ( var index=0; index<data.length; index++ ) {
    firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+cdate+"/"+data[index].IDs).update({
      foodID:data[index].IDs, 
      description:data[index].descriptions,
    }).then(()=>{
      
    }).catch(e=>{
      alert(e);
    })
  }
  })

}

// calculating totals of nutrition for each day
public getTotal() {
  var cdata=[];
  var d=new Date();
  var year=d.getFullYear();
  var date=d.getDate().toString();
  var ctotal0=0; 
  var nuts=[];
  var result = [0,0,0,0,0,0,0,0,0,0,0,0];

  if(parseInt(date)<10){
    date="0"+date;
  }
  var month=(d.getMonth()+1).toString();
  if(parseInt(month)<10){
    month="0"+month;
  }
  var cdate=(year+"-"+month+"-"+date);
  firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+ cdate+"/").on('value', (snap)=> {
    let result = snap.val();
    for(let k in result){
     cdata.push(k);
    }
  });

  this.currdata = cdata;
  for (var i=0; i<cdata.length; i++) {
    for (var j=0; j<12; j++) {
      firebase.database().ref("Users/meals/"+firebase.auth().currentUser.uid+"/"+ cdate+"/"+cdata[i]+"/labelNutrients/"+j+"/value").on('value', (snap)=> { 
        if(snap.exists()) {
          result[j] = result[j]+snap.val(); 
        }
      });
    }
  }
  this.total0 = result[0];
  this.total1 = result[1];
  this.total2 = result[2];
  this.total3 = result[3];
  this.total4 = result[4];
  this.total5 = result[5];
  this.total6 = result[6];
  this.total7 = result[7];
  this.total8 = result[8];
  this.total9 = result[9];
  this.total10 = result[10];
  this.total11 = result[11];
} 
  
  ngOnInit(): void {
   
  }
  
  
}
