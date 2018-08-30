import { NgModule } from "@angular/core";
import { StarkMaskDirective, StarkTimestampMaskDirective } from "./directives";
import { StarkMaskService } from "./services";

@NgModule({
	declarations: [StarkMaskDirective, StarkTimestampMaskDirective],
	exports: [StarkMaskDirective, StarkTimestampMaskDirective],
	providers: [StarkMaskService],
})
export class StarkMasksModule {}
