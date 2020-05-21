import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullLayoutComponent} from "./layout/full-layout.component";
import { ForgetComponent } from './forget/forget.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { HistoryComponent } from './history/history.component';
import { ReccomendationsComponent } from './reccomendations/reccomendations.component';

// Layouts
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'forget',
    component: ForgetComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data:{
          title2:"Dashboard"
        }
      },
      {
        path: 'form',
        loadChildren: './form/form.module#FormModule',
        data:{
          title2:"Dashboard"
        }
      },
      {
        path: 'dashboard/profile',
        component: ProfileComponent,
        data:{
          title2:"Profile"
        }
      },
      {
        path: 'dashboard/history',
        component: HistoryComponent,
        data:{
          title2:"History"
        }
      },
      {
        path: 'dashboard/reccomendations',
        component: ReccomendationsComponent,
        data: {
          title2: "Reccomendations"
        }
      },
      {
        path: 'dashboard/account',
        component: AccountComponent,
        data:{
          title2:"Account"
        }
      },
      {
        path:'Dashboard',
        children:[
          {
            path: '',
            pathMatch: 'full',
            redirectTo:'widget/main'
          },
          {
            path: 'main',
            loadChildren: './widgets/main/main.module#MainWidgetModule'
          },
          {
            path: 'table',
            loadChildren: './widgets/tables/tables.module#TablesWidgetModule'
          },
          {
            path: 'chart',
            loadChildren: './widgets/charts/charts.module#ChartsWidgetModule'
          }
        ]
      }

    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
