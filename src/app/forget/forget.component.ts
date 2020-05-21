import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login/login.service";
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  public form:FormGroup;
  public email:AbstractControl;
  constructor(private fb:FormBuilder,private router:Router, private service:AuthService) { 
    this.form = fb.group({
      'email': ["", Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });
    this.email = this.form.controls['email'];
  }
 
  ngOnInit() {
  }
  public onSubmit(values:Object){
      this.service.sendRestEmail(values['email']);
  }
}
