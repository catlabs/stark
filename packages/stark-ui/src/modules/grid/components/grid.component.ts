import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'stark-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: "stark-grid" }
})
export class StarkGridComponent implements OnInit {
  @Input() public data: object[];

  @ViewChild(MatSort) sort: MatSort;

  public columnsProperties = [
    {name: "id", label: "id", isSortable: false},
    {name: "title", label: "Title"},
    {name: "description",label: "Description"}
  ];

  public displayedColumns = this.columnsProperties.map(x => x.name);

  public dataSource = new MatTableDataSource([
    {id: "a",title: "first title", description: "description number one"},
    {id: "b",title: "second title", description: "second description"},
    {id: "c",title: "third title", description: "the third description"},
    {id: "d",title: "fourth title", description: "description number four"}, 
    {id: "e",title: "fifth title", description: "fifth description"}, 
    {id: "f",title: "sixth title", description: "the sixth description"}
  ]);

  public constructor() {
		// empty constructor
	}

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public handleSort(e:any){
    console.log(e);
    console.log(this.sort);
  }

  public changeSortTest(event: any): void{
    event.stopPropagation();
  }
}