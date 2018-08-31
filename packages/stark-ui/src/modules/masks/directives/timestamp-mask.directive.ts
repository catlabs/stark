import { Directive, Inject, Input, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkMaskService } from "../services/mask.service";
import { StarkMaskDirective } from "../directives/mask.directive";

/**
 * Name of the directive
 */
const directiveName: string = "[starkTimestampMask]";

/**
 * Directive to restrict the characters that can be typed in a field to allow only those matching a regex pattern.
 */
@Directive({
	selector: directiveName,
	providers: [
		{
		  provide: NG_VALUE_ACCESSOR,
		  multi: true,
		  useExisting: StarkTimestampMaskDirective
		}
	  ]
})
export class StarkTimestampMaskDirective extends StarkMaskDirective{
	@Input("starkTimestampMask")
	public mask: string;

	public onChange: Function;

    /**
	 * Class constructor
	 * @param logger - The logger of the application
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) protected logger: StarkLoggingService, protected maskService: StarkMaskService, protected el: ElementRef) {
		super(logger, maskService, el);
	}
	
	/**
	 * Directive lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(directiveName + ": directive initialized");
		/*if(this.control !== null){
			this.control.control.setValue('dfdsfdsfffd', { emitEvent: false });
		}*/
	}
}
