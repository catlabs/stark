import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
	selector: "stark-grid",
	templateUrl: "./grid.component.html",
	styleUrls: ["./grid.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: { class: "stark-grid" }
})
export class StarkGridComponent implements OnInit {
	@Input() public data: object[];

	@ViewChild(MatSort) sort: MatSort;

	public columnsProperties = [
		{ name: "id", label: "id", isSortable: false },
		{ name: "title", label: "Title" },
		{ name: "description", label: "Description" }
	];

	public displayedColumns = this.columnsProperties.map(x => x.name);

	public dataSource = new MatTableDataSource([
		{ id: "a", title: "first title", description: "description number one" },
		{ id: "b", title: "second title", description: "second description" },
		{ id: "c", title: "third title", description: "the third description" },
		{ id: "d", title: "fourth title", description: "description number four" },
		{ id: "e", title: "fifth title", description: "fifth description" },
		{ id: "f", title: "sixth title", description: "the sixth description" }
	]);

	public constructor() {}

	public applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	public ngOnInit() {
		this.dataSource.sort = this.sort;
	}

	public handleSort(e: any) {
		console.log(e);
		console.log(this.sort);
	}

	public changeSortTest(event: any): void {
		event.stopPropagation();
	}
}

/*export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/
