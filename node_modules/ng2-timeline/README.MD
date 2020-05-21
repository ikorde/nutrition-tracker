# ng2-timeline

## Installation

To install this library, run:

```bash
$ npm install ng2-timeline --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-timeline
```

and then from your Angular `Module`:

```typescript
// Import your library
import { Ng2Timeline } from 'ng2-timeline';

@NgModule({
  declarations: [
      XComponent
  ],
  imports: [
    // Specify your library as an import
    Ng2Timeline
  ],
  providers: [],
})
export class XModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ng2-timeline [completeListener]="completeListener" [data]="timelineData"></ng2-timeline>
```

In your component class create the parameter and callback function
```typescript
@Component({
  templateUrl: './x.component.html',
  selector:'x'
})
export class XComponent {
  /**
  * This function should return true for an event to be
  * completed
  */
  public completeListener(item){
    console.log(item);
    return true;
  }
   /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
  public timelineData:Array<Object> =[
    {
      title:"Step 1",
      icon:'<i class="fa fa-home"></i>',
      content:"Hello World",
      complete:true
    },
    {
      title:"Step 2",
      icon:'<i class="fa fa-home"></i>',
      content:"Following step to complete",
      complete:false
    }
  ];
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
