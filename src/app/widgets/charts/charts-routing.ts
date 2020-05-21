
import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';
import {ChartsWidgetComponent} from "./charts.component";

const routes: Routes = [
  {
    path: '',
    component: ChartsWidgetComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsWidgetRoutingModule {}
