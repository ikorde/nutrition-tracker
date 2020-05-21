import { NgModule ,} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashService } from 'app/dash.service';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfileComponent],
  providers:[DashService]
})
export class ProfileModule { }
