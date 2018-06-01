import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { StarkGridComponent } from "./components";

@NgModule({
	declarations: [StarkGridComponent],
	exports: [StarkGridComponent],
	imports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatSortModule,
		MatTableModule
	],
})
export class StarkGridModule {}
