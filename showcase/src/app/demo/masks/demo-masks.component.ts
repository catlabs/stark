import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "showcase-demo-masks",
	templateUrl: "./demo-masks.component.html"
})
export class DemoMasksComponent implements OnInit {
	public dateFormControl: FormControl;
	public numberFormControl: FormControl;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		console.log("init");

		this.dateFormControl = new FormControl("");
		this.numberFormControl = new FormControl("");
	}
}
