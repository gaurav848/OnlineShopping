import {PipeTransform, Pipe} from '@angular/core';
import {isString, extractDeepPropertyByMapKey, isNumberFinite, isBoolean, isUndefined} from './helpers';

@Pipe({name: 'filterByOr', pure: true})
export class FilterByOrPipe implements PipeTransform {

  transform(input: any, props: Array<string>, search: any = '', strict: boolean = false): any[] {
    if (!Array.isArray(input) || (!isString(search) && !isNumberFinite(search) && !isBoolean(search))) {
      return input;
    }


    const searchTerms = String(search).toLowerCase().split(' ');
    // console.log("searchTerms Lenght: " + searchTerms.length.toString() );
    // console.log("TestMy Data: " + JSON.stringify(searchTerms));

    if (searchTerms.length > 1 && searchTerms[searchTerms.length - 1] === '') {
        searchTerms.splice(searchTerms.length - 1, 1);
    }
    // Iterate over each of List item on which this pipe has to be applied. e.g. each item in ProcessOrderList
    return input.filter((obj) => {
        return searchTerms.some((term)=> { // Iterate over values to be looked in.
            return props.some((prop) => {
                const value = extractDeepPropertyByMapKey(obj, prop),
                strValue: string = String(value).toLowerCase();

                if (isUndefined(value)) {
                return false;
                }

                return strict
                ? term === strValue
                : !!~strValue.indexOf(term);
            }); // some
        }); // every
    }); // filter
  }
}
