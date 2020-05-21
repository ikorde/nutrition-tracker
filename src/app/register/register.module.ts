import { NgModule } from '@angular/core';
import { RegisterComponent} from "./register.component";
import { RegisterRoutingModule} from "./register-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterService} from "./register.service";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import { AuthService } from 'app/auth.service';

@NgModule({
  imports: [
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule
  ],
  declarations: [ RegisterComponent],
  providers: [ RegisterService,AuthService ]
})
export class RegisterModule { }
