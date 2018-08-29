import { Directive, forwardRef, HostListener, Inject, Injector, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

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
		  useExisting: forwardRef(() => StarkTimestampMaskDirective)
		}
	  ]
})
export class StarkTimestampMaskDirective implements OnInit, ControlValueAccessor {
	/**
	 * A valid regular expression that defines the allowed characters
	 */
	/* tslint:disable:no-input-rename */
	@Input("starkTimestampMask")
	public maskFormat: string;

	public control: NgControl;

	// tslint:disable-next-line
	public onChange = (val: string) => { 
		console.log(val);
	};
	
	public onTouch = () => {
		console.log('onTouch');
	};

	@HostListener('input', ['$event'])
    public onInput(e: KeyboardEvent): void {
        const el: HTMLInputElement = (e.target as HTMLInputElement);
        this.onChange(el.value);
	}

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService, private injector: Injector) {
		this.control = this.injector.get(NgControl);
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

	/** It writes the value in the input */
    public writeValue(_inputValue: string): void {
        
    }

    // tslint:disable-next-line
    public registerOnChange(fn: any): void {
        this.onChange = fn;
	}
	
	// tslint:disable-next-line
    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
}
