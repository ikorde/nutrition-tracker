import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Created by mohma on 7/31/2017.
 */
var Ng2TimelineComponent = (function () {
    function Ng2TimelineComponent() {
    }
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2TimelineComponent.prototype.onClick = function (index) {
        if (this.listener) {
            if (this.listener(this.items[index])) {
                this.items[index]['complete'] = !this.items[index]['complete'];
            }
        }
    };
    /**
     * @return {?}
     */
    Ng2TimelineComponent.prototype.ngOnInit = function () {
    };
    return Ng2TimelineComponent;
}());
Ng2TimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-timeline',
                template: "<ul class=\"timeline\"> <li *ngFor=\"let item of items; index as i\"> <a href=\"javascript:void(0)\" (click)=\"onClick(i)\"> <div class=\"timeline-badge {{item['complete']?'primary':''}}\" [innerHTML]=\"item['icon']\"> </div> </a> <div class=\"timeline-panel {{item['complete']?'completedEvent':''}}\"> <div class=\"timeline-heading\"> <h4 class=\"timeline-title\">{{item['title']}}</h4> </div> <div class=\"timeline-body\"> <p>{{item['content']}}</p> </div> </div> </li> </ul> ",
                styles: [".timeline { list-style: none; padding: 20px 0 20px; position: relative; } .timeline:before { top: 0; bottom: 0; position: absolute; content: \" \"; width: 2px; background-color: #e9ecf2; left: 25px; margin-right: -1.5px; } .timeline > li { margin-bottom: 20px; position: relative; box-sizing: border-box; } .timeline > li:before, .timeline > li:after { content: \" \"; display: table; } .timeline > li > a > .timeline-badge { color: #fff; width: 46px; height: 46px; line-height: 51px; font-size: 1.4em; text-align: center; position: absolute; top: 16px; left: 0px; margin-right: -25px; background-color: #999999; z-index: 100; border-radius: 9999px; } .timeline > li > .timeline-panel { width: calc( 100% - 65px); float: right; border: 1px solid #edeeed; border-radius: 2px; padding: 10px 20px; position: relative; box-shadow: none; } .timeline > li:after { clear: both; } .timeline-badge.primary { background-color: #30a5ff !important; } .completedEvent { text-decoration: line-through; } "]
            },] },
];
/**
 * @nocollapse
 */
Ng2TimelineComponent.ctorParameters = function () { return []; };
Ng2TimelineComponent.propDecorators = {
    'items': [{ type: Input, args: ['data',] },],
    'listener': [{ type: Input, args: ['completeListener',] },],
};

var Ng2Timeline = (function () {
    function Ng2Timeline() {
    }
    return Ng2Timeline;
}());
Ng2Timeline.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [Ng2TimelineComponent],
                providers: [],
                exports: [Ng2TimelineComponent]
            },] },
];
/**
 * @nocollapse
 */
Ng2Timeline.ctorParameters = function () { return []; };

export { Ng2Timeline };
