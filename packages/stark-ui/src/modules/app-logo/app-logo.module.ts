import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StarkAppLogoComponent } from "./components";

@NgModule({
	declarations: [StarkAppLogoComponent],
	exports: [
		StarkAppLogoComponent,
		MatButtonModule,
		MatCardModule
	],
	imports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule
	],
})
export class StarkAppLogoModule {}
