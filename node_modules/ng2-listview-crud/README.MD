# ng2-listview-crud

This is a Angular JS 2/4 module that can be included in projects to automatically render a listview with built-in create, delete, update, read and search.

## Installation

To install this library, run:

```bash
$ npm install ng2-listview-crud --save
```

## Usage
Declare this component in the declaration

    ```typescript
        import { NgModule } from '@angular/core';
        import {Ng2ListViewCRUD} from "ng2-listview-crud";



        @NgModule({
          imports: [
          ],
          declarations: [ Ng2ListViewCRUD ],
          providers: [  ]
        })
        export class MainWidgetModule { }
    ```
In the component [For simple array]

    ```typescript
    import { Component } from '@angular/core';
    import {Ng2ListViewCRUDProperty} from "ng2-listview-crud";

    @Component({
      templateUrl: './main.component.html',
      selector:'widget-main'
    })
    export class MainWidgetComponent {

      public listView:Ng2ListViewCRUDProperty= {
        add:true,//Adding possible
        remove:true,//Removing elements possible
        edit:true,//editing possible
        dataIsObject:false,
        path:[],
        label:"CRUD ListView",
        headingBackgroundColor:"#3752ff",
        headingFontColor:"#5f6468",
        icon:"fa fa-cogs",
        onDelete:function(value){
          console.log("Deleting Value: "+JSON.stringify(value));
          return true;
        },
        onUpdate:function(value,newValue){
          console.log("Editing Value: "+JSON.stringify(value)+" New Value:"+newValue);
          return true;
        },
        onSearch:function(value){
          console.log(value)
        },
        onAdd:function(value){
          console.log("Adding Value: "+JSON.stringify(value));
          return true;
        },
        onSelect:function(value){
          console.log(JSON.stringify(value));
        },
        onSearchChange:function(value){
          console.log(value)
        }  
      };

      //In this specific example the field name.first is displayed in the list
      public listItems:Array<Object>=
      [
      "Apple","Orange"
      ];
    }
    ```
    
In the component [For nested structure]

    ```typescript
    import { Component } from '@angular/core';
    import {Ng2ListViewCRUDProperty} from "ng2-listview-crud";

    @Component({
      templateUrl: './main.component.html',
      selector:'widget-main'
    })
    export class MainWidgetComponent {

      public listView:Ng2ListViewCRUDProperty= {
        add:true,//Adding possible
        remove:true,//Removing elements possible
        edit:true,//editing possible  
        dataIsObject:true,
        path:["name","first"],
        label:"CRUD ListView",
        headingBackgroundColor:"#3752ff",
        headingFontColor:"#5f6468",
        icon:"fa fa-cogs",
        onDelete:function(value){
          console.log("Deleting Value: "+JSON.stringify(value));
          return true;
        },
        onUpdate:function(value,newValue){
          console.log("Editing Value: "+JSON.stringify(value)+" New Value:"+newValue);
          return true;
        },
        onSearch:function(value){
          console.log(value)
        },
        onAdd:function(value){
          console.log("Adding Value: "+JSON.stringify(value));
          return true;
        },
        onSelect:function(value){
          console.log(JSON.stringify(value));
        },
        onSearchChange:function(value){
          console.log(value)
        }  
      };

      //In this specific example the field name.first is displayed in the list
      public listItems:Array<Object>=
      [
      {name:{first:"Hello",last:"World"},count:2}
      {name:{first:"Hello2",last:"World"},count:2}
      ];
    }
    ```




Place the ng2-listview-crud selector in your component's html:

  ```html
     <ng2-listview-crud [properties]="listView" [data]="listItems"></ng2-listview-crud>
   ```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Mohammed Rashid](mailto:mohmad.rashid@hotmail.com)
