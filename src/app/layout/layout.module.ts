import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashService } from 'app/dash.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[DashService]
})
export class LayoutModule { }
