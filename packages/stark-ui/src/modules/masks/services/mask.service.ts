import { Injectable } from "@angular/core";

/**
 * StarkMaskService service
 */
@Injectable()
export class StarkMaskService{
    
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


    
}