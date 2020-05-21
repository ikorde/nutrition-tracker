
import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';
import { MainWidgetComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainWidgetComponent,
    data: {
      title: 'Form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainWidgetRoutingModule {}
