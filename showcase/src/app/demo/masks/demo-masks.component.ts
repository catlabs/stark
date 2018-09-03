import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkMaskConfig } from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "showcase-demo-masks",
	templateUrl: "./demo-masks.component.html"
})
export class DemoMasksComponent implements OnInit {
	public starkMaskConfig1FormControl: FormControl;
	public starkMaskConfig2FormControl: FormControl;
	public starkMaskConfig3FormControl: FormControl;

	public starkMaskConfig1: StarkMaskConfig;
	public starkMaskConfig2: StarkMaskConfig;
	public starkMaskConfig3: StarkMaskConfig;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.starkMaskConfig1FormControl = new FormControl("");
		this.starkMaskConfig2FormControl = new FormControl("");
		this.starkMaskConfig3FormControl = new FormControl("");

		this.starkMaskConfig1 = {
			mask: "0000-0000-0000-0000",
			placeholderChar: "_",
			separatorChars: ["-"]
		};

		this.starkMaskConfig2 = {
			mask: "000/0000/00000",
			placeholderChar: "_",
			separatorChars: ["/"],
			prefix: "+++",
			suffix: "+++"
		};

		this.starkMaskConfig3 = {
			mask: "000000",
			placeholderChar: " "
		};
	}
}
