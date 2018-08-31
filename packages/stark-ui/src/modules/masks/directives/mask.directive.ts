import { Directive, HostListener, Inject, Input, OnInit, ElementRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkMaskService } from "../services/mask.service";

/**
 * Stark Action Bar Config interface
 */
export interface StarkMaskConfig {
    mask: string,
    placeholderChar: string,
    separatorChars: Array<string>
}

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
    public starkMaskConfig: StarkMaskConfig;

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

    public onChange: Function;
    public onTouch: Function;

    private rawValue: string;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 */
    public constructor(@Inject(STARK_LOGGING_SERVICE) protected logger: StarkLoggingService, protected maskService: StarkMaskService, protected inputRef: ElementRef<HTMLInputElement>) {

    }

    @HostListener('input', ['$event'])
    public onInput(e: any): void {
        const maskedValue: string = this.applyMask(e.target.value, e.inputType);
        this.writeValue(maskedValue);
        this.onChange(this.unMask(e.target.value));
    }

	/**
	 * Directive lifecycle hook
	 */
    public ngOnInit(): void {
        this.logger.debug(directiveName + ": directive initialized");

        this.starkMaskConfig = {
            mask: '00/00/0000',
            placeholderChar: '_',
            separatorChars: ['/'],
        };
    }

    public applyMask(inputValue: string, inputType: string): string {
        console.log('inputValue: '+inputValue);
        if (this.starkMaskConfig.mask === undefined) {
            this.rawValue = this.rawValue;
            return this.rawValue;
        } else if (inputValue === undefined || inputValue === null || this.starkMaskConfig.mask === undefined || inputValue === '') {
            this.rawValue = '';
            return '';
        }

        let cursor: number = 0;
        let result: string = '';

        const inputArray: string[] = inputValue.toString().split('');
        const placeholderArray: string[] = this.starkMaskConfig.mask.replace(new RegExp(Object.keys(this.maskAvailablePatterns).join('|'), 'gi'), this.starkMaskConfig.placeholderChar).split('');

        //Parse inputValue transformed in Array
        for (let i: number = 0, inputChar: string = inputArray[0]; i < inputArray.length; i++ , inputChar = inputArray[i]) {
            if (cursor === this.starkMaskConfig.mask.length || this.starkMaskConfig.placeholderChar === this.starkMaskConfig.mask[i]) {
                break;
            }

            if (this.checkMaskChar(inputChar, this.starkMaskConfig.mask[i])) {
                result += inputChar;
                cursor++;
            }
        }

        //Autocomplete following separator char(s)
        if(inputType != "deleteContentBackward"){
            while (this.starkMaskConfig.mask.length > cursor && this.starkMaskConfig.separatorChars.includes(this.starkMaskConfig.mask[cursor])) {
                result += this.starkMaskConfig.mask[cursor];
                cursor++;
            }
        }

        this.rawValue = result;
        if(this.rawValue === ''){
            return '';
        }

        //Add placeholder missing chars
        for (let i: number = cursor, placeholderChar: string = placeholderArray[cursor]; i < placeholderArray.length; i++ , placeholderChar = placeholderArray[i]) {
            result += placeholderChar;
            cursor++;
        }
        
        return result;
    }

    public unMask(inputValue: string): string {
        return inputValue;
        /*    ? inputValue.replace(this.regExpForRemove(this.maskHintCharacters), '')
            : inputValue;*/
    }

    /** It writes the value in the input */
    public writeValue(inputValue: string): void {
        const nativeElement: HTMLInputElement = this.inputRef.nativeElement;
        nativeElement.value = inputValue;
        if(this.rawValue){
            this.inputRef.nativeElement.selectionEnd = this.rawValue.length;
        }
    }

    // tslint:disable-next-line
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // tslint:disable-next-line
    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    protected checkMaskChar(inputChar: string, maskChar: string): boolean {
        return inputChar === maskChar
            || this.maskAvailablePatterns[maskChar]
            && this.maskAvailablePatterns[maskChar].pattern
            && this.maskAvailablePatterns[maskChar].pattern.test(inputChar);
    }

    /*protected regExpForRemove(specialCharactersForRemove: string[]): RegExp {
        return new RegExp(specialCharactersForRemove
            .map((item: string) => `\\${item}`)
            .join('|'), 'gi');
    }*/
}
