import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import {ForgetComponent} from "./forget.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { AuthService } from 'app/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ForgetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [ForgetComponent],
  providers: [ AuthService ]

})
export class ForgetModule { }
