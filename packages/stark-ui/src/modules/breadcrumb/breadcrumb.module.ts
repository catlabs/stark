import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StarkBreadcrumbComponent } from "./components";

@NgModule({
	declarations: [StarkBreadcrumbComponent],
	exports: [StarkBreadcrumbComponent],
	imports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule
	],
})
export class StarkBreadcrumbModule {}
