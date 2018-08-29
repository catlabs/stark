import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "showcase-demo-masks",
	templateUrl: "./masks.component.html"
})
export class MasksComponent implements OnInit {
	public name: string;
	public nameFormControl: FormControl;
	public titleFormControl: FormControl;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		console.log("init");

		//this.nameFormControl = new FormControl([ 'name' ]);
		this.titleFormControl = new FormControl(["title"]);
	}
}
