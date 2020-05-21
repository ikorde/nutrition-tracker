import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, CommonModule, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app.routing';
import { FullLayoutComponent} from './layout/full-layout.component';
import {Ng2AutoBreadCrumb} from "ng2-auto-breadcrumb";
import { ForgetComponent } from './forget/forget.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginService } from './login/login.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { DashboardService } from './dashboard/dashboard.service';
import { AuthService } from './auth.service';
import { DashService } from './dash.service';
import { AccountComponent } from './account/account.component';
import { HistoryComponent } from './history/history.component';
import { ReccomendationsComponent } from './reccomendations/reccomendations.component';

@NgModule({
  imports: [
   
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    Ng2AutoBreadCrumb,
    HttpClientModule
  ],
  declarations: [
    FullLayoutComponent,
    AppComponent,
    ForgetComponent,
    ProfileComponent,
    AccountComponent,
    HistoryComponent,
    ReccomendationsComponent
  ],
  providers: [{
    provide: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    useClass: HashLocationStrategy
  },LoginService,DashboardService,AuthService,DashService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
