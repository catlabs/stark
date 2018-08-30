import { Directive, HostListener, Inject, Input, OnInit, ElementRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkMaskService } from "../services/mask.service";

/**
 * Name of the directive
 */
const directiveName: string = "[starkMask]";

/**
 * Directive to restrict the characters that can be typed in a field to allow only those matching a regex pattern.
 */
@Directive({
	selector: directiveName,
	providers: [
		{
		  provide: NG_VALUE_ACCESSOR,
		  multi: true,
		  useExisting: StarkMaskDirective
		}
	  ]
})
export class StarkMaskDirective implements OnInit, ControlValueAccessor {
	/**
	 * A valid regular expression that defines the allowed characters
	 */
	@Input("starkMask")
	public mask: string;

	public maskAvailablePatterns = {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true
        },
        'A': {
            pattern: new RegExp('\[a-zA-Z0-9\]')
        },
        'S': {
            pattern: new RegExp('\[a-zA-Z\]')
        }
    };

    public maskHintCharacters = ['.', '_'];
    public maskSpecialCharacters = ['/'];

	public onChange: Function;

  	public onTouch: Function;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) protected logger: StarkLoggingService, protected maskService: StarkMaskService, protected el: ElementRef) {}
	
	@HostListener('input', ['$event'])
	public onInput(e: any): void {
    	this.writeValue(this.applyMask(e.target.value, this.mask));
		this.onChange(this.unMask(e.target.value));
	}

	/**
	 * Directive lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(directiveName + ": directive initialized");
		console.log(this.mask);
		/*if(this.control !== null){
			this.control.control.setValue('dfdsfdsfffd', { emitEvent: false });
		}*/
	}

	public applyMask(inputValue: string, maskExpression?: string, _position: number = 0): string {
        if(maskExpression === undefined){
            return inputValue;
        }else if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }

        let cursor: number = 0;
        let result: string = '';

        const inputArray: string[] = inputValue.toString().split('');

        for (let i: number = 0, inputSymbol: string = inputArray[0]; i< inputArray.length; i++, inputSymbol = inputArray[i]) {
            if (cursor === maskExpression.length) {
                break;
            }

            if (this.checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                result += inputSymbol;
                cursor++;
            }
            else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                result += maskExpression[cursor];
                cursor++;
                i--;
            }
            /*if(){

            }*/
        }

        /*if(){

        }

        '12/0_/__'*/
        
        return result;
    }
    
    public unMask(inputValue: string): string {
        return inputValue
            ? inputValue.replace(this.regExpForRemove(this.maskHintCharacters), '')
            : inputValue;
    }

	/** It writes the value in the input */
    public writeValue(inputValue: string): void {
        const nativeElement: HTMLInputElement = this.el.nativeElement;
    	nativeElement.value = this.applyMask(inputValue);
    }

    // tslint:disable-next-line
    public registerOnChange(fn: any): void {
        this.onChange = fn;
	}
	
	// tslint:disable-next-line
    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
	}
	
	protected checkSymbolMask(inputSymbol: string, maskSymbol: string): boolean {
        return inputSymbol === maskSymbol
            || this.maskAvailablePatterns[maskSymbol]
            && this.maskAvailablePatterns[maskSymbol].pattern
            && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    }

    protected regExpForRemove(specialCharactersForRemove: string[]): RegExp {
        return new RegExp(specialCharactersForRemove
            .map((item: string) => `\\${item}`)
            .join('|'), 'gi');
    }
}
