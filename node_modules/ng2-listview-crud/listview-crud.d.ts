/**
 * Created by mohma on 7/26/2017.
 */
export interface Ng2ListViewCRUDProperty {
    dataIsObject: boolean;
    add: boolean;
    edit: boolean;
    remove: boolean;
    path: Array<string>;
    label: string;
    headingBackgroundColor: string;
    headingFontColor: string;
    icon: string;
    onSelect: any;
    onDelete: any;
    onUpdate: any;
    onSearch: any;
    onSearchChange: any;
    onAdd: any;
}
