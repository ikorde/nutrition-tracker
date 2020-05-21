(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/forms'], factory) :
	(factory((global['ng2-listview-crud'] = {}),global._angular_common,global._angular_core,global._angular_forms));
}(this, (function (exports,_angular_common,_angular_core,_angular_forms) { 'use strict';

/**
 * Created by mohma on 7/27/2017.
 */
var Ng2ListViewCRUDComponent = (function () {
    function Ng2ListViewCRUDComponent() {
        this.value = "";
        this.search = "";
        this.opType = "Add";
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngOnChanges = function (changes) {
        this.subData = this.items;
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngOnInit = function () {
        this.properties.icon += " fa-fw";
        this.subData = this.items;
        this.path = "";
        for (var /** @type {?} */ i = 0; i < this.properties.path.length; i++) {
            this.path += this.properties.path[i];
            if (i !== this.properties.path.length - 1) {
                this.path += ".";
            }
        }
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngAfterViewInit = function () {
        var /** @type {?} */ self = this;
        $('ul.ng2-listview').on('click', 'li', function () {
            $('.selected').removeClass('selected');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                self.selectedIndex = $(this).attr('id');
                $(this).addClass('selected');
                self.properties.onSelect(self.items[self.selectedIndex]);
            }
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onChangeListener = function ($event) {
        var /** @type {?} */ self = this;
        if (this.search === "") {
            this.subData = this.items;
            return;
        }
        this.properties.onSearchChange(self.search);
        var /** @type {?} */ result = this.items.filter(function (lhs) {
            var /** @type {?} */ data = lhs;
            if (self.properties.dataIsObject) {
                if (!lhs[self.properties.path[0]])
                    return false;
                data = lhs[self.properties.path[0]];
                for (var /** @type {?} */ i = 1; i < self.properties.path.length; i++) {
                    if (data[self.properties.path[i]])
                        data = data[self.properties.path[i]];
                    else {
                        return false;
                    }
                }
            }
            return data.match(self.search);
        });
        this.subData = result;
    };
    /**
     * @param {?} obj
     * @param {?} path
     * @param {?} newValue
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.changeJSONValue = function (obj, path, newValue) {
        var /** @type {?} */ parts = path.split('.');
        while (parts.length > 1 && (obj = obj[parts.shift()])) { }
        
        obj[parts.shift()] = newValue;
        return obj;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.getJSONValue = function (obj) {
        if (!obj[this.properties.path[0]])
            return "Not Available";
        var /** @type {?} */ data = obj[this.properties.path[0]];
        for (var /** @type {?} */ i = 1; i < this.properties.path.length; i++) {
            if (!data[this.properties.path[i]])
                return "Not Available";
            data = data[this.properties.path[i]];
        }
        return data;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.append = function (value) {
        var /** @type {?} */ data = value;
        if (this.properties.dataIsObject) {
            data = "";
            var /** @type {?} */ closing = "";
            for (var /** @type {?} */ i = 0; i < this.properties.path.length; i++) {
                data += "{\"";
                data += this.properties.path[i] + "\":";
                closing += "}";
            }
            data += ('"' + value + '"' + closing);
            try {
                data = JSON.parse(data);
            }
            catch (e) {
                throw e;
            }
        }
        this.items.push(data);
        return data;
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onAddClickListener = function () {
        if (this.value.length !== 0 && this.opType === "Add") {
            if (this.properties.onAdd && this.properties.onAdd(this.append(this.value))) {
                this.value = "";
            }
            else {
                console.log("Function onAdd not found");
            }
        }
        else if (this.value.length !== 0 && this.opType === "Edit") {
            if (this.properties.onAdd && this.properties.onUpdate(this.items[this.selectedIndex], this.value)) {
                if (!this.properties.dataIsObject) {
                    this.items[this.selectedIndex] = this.value;
                }
                else {
                    this.changeJSONValue(this.items[this.selectedIndex], this.path, this.value);
                }
                this.value = "";
                this.opType = "Add";
            }
            else {
                console.log("Function onEdit not found");
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onEditClickListener = function (index) {
        this.selectedIndex = index;
        if (!this.properties.dataIsObject)
            this.value = this.items[this.selectedIndex];
        else {
            var /** @type {?} */ data = this.items[this.selectedIndex][this.properties.path[0]];
            for (var /** @type {?} */ i = 1; i < this.properties.path.length; i++) {
                if (!data[this.properties.path[i]]) {
                    return null;
                }
                data = data[this.properties.path[i]];
            }
            this.value = data;
        }
        this.opType = "Edit";
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.delete = function (index) {
        this.items.splice(index, 1);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.get = function (index) {
        return this.items[index];
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onDeleteClickListener = function (index) {
        this.selectedIndex = index;
        if (this.properties.onDelete && this.properties.onDelete(this.get(this.selectedIndex))) {
            this.delete(this.selectedIndex);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.getData = function (item) {
        if (!this.properties.dataIsObject) {
            return item;
        }
        return this.getJSONValue(item);
    };
    return Ng2ListViewCRUDComponent;
}());
Ng2ListViewCRUDComponent.decorators = [
    { type: _angular_core.Component, args: [{
                template: "<div class=\"panel\"> <div class=\"panel-heading\" [style.background]=\"properties['headingBackgroundColor']\" [style.color]=\"properties['headingFontColor']\"> <i [class]=\"properties['icon']\" style=\"margin-right: 10px\"></i>{{properties['label']}} </div> <input type=\"text\" class=\"form-control searchBoxListView\" placeholder=\"Search....\" [(ngModel)]=\"search\" (keyup)=\"onChangeListener($event)\"> <div class=\"panel-body\"> <ul class=\"ng2-listview\"> <li *ngFor=\"let item of subData; index as i\" class=\"ng2-listview-item\" [id]=\"i\" > {{getData(item)}} <div class=\"pull-right action-buttons\"> <a href=\"javascript:void(0)\" (click)=\"onEditClickListener(i)\" [hidden]=\"!properties['edit']\"><i class=\"fa fa-pencil fa-fw\"></i> </a> <a href=\"javascript:void(0)\" (click)=\"onDeleteClickListener(i)\" [hidden]=\"!properties['remove']\"><i class=\"fa-fw fa fa-remove\"></i> </a> </div> </li> </ul> </div> <div class=\"panel-footer\" [hidden]=\"!properties['add']\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control input-md\" placeholder=\"Add\" [(ngModel)]=\"value\"> <span class=\"input-group-btn\"> <button class=\"btn btn-success btn-md\" id=\"btn-todo\" (click)=\"onAddClickListener()\">{{opType}}</button> </span> </div> </div> </div> ",
                selector: 'ng2-listview-crud',
                styles: ["/** NG2-Listview-CRUD Author: Mohammed Rashid Github: https://github.com/mohdrashid */ .selected { background: bisque; } .ng2-listview { padding: 0; margin: -15px; background: #fff; color: #5f6468; } #checkbox { margin: 0; } .ng2-listview .checkbox { display: inline-block; margin: 0px; } .panel-body input[type=checkbox]:checked + label { text-decoration: line-through; color: #777; } .ng2-listview-item { list-style: none; line-height: 0.9; padding: 14px 15px 8px 15px; } .ng2-listview-item:hover, a.ng2-listview-item:focus { text-decoration: none; background-color: #f6f6f6; } .ng2-listview-item .trash .glyph:hover { color: #ef4040; } .searchBoxListView { border-radius: 0px; } ul li a { text-decoration: none; } ul li div { display: none; } ul li:hover div { display: inline; } "]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUDComponent.ctorParameters = function () { return []; };
Ng2ListViewCRUDComponent.propDecorators = {
    'properties': [{ type: _angular_core.Input, args: ['properties',] },],
    'items': [{ type: _angular_core.Input, args: ['data',] },],
};

var Ng2ListViewCRUD = (function () {
    function Ng2ListViewCRUD() {
    }
    return Ng2ListViewCRUD;
}());
Ng2ListViewCRUD.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule, _angular_forms.FormsModule, _angular_forms.ReactiveFormsModule,
                ],
                declarations: [
                    Ng2ListViewCRUDComponent
                ],
                exports: [
                    Ng2ListViewCRUDComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUD.ctorParameters = function () { return []; };

exports.Ng2ListViewCRUD = Ng2ListViewCRUD;

Object.defineProperty(exports, '__esModule', { value: true });

})));
