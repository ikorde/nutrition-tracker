import {Component, Input} from "@angular/core";
import {StatsCard} from "./statsCard";

@Component({
  templateUrl: './statsCard.component.html',
  selector:'statsCard',
  styleUrls: ['./statsCard.scss']
})
export class StatsCardComponent {
  @Input('data') properties: StatsCard={color:"#30a5ff",label:"Label",data:0,icon:"fa-line-chart"};

  constructor(){
  }

  ngOnInit() {
    this.properties.icon+=" fa fa-3x fa-fw";
  }
}
