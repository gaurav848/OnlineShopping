import {PipeTransform, Pipe} from '@angular/core';
import {isString, extractDeepPropertyByMapKey, isNumberFinite, isBoolean, isUndefined} from './helpers';

@Pipe({name: 'filterByAnd', pure: true})
export class FilterByAndPipe implements PipeTransform {

  transform(input: any, props: Array<string>, search: any = '', strict: boolean = false): any[] {
    if (!Array.isArray(input) || (!isString(search) && !isNumberFinite(search) && !isBoolean(search))) {
      return input;
    }

    const searchTerms = String(search).toLowerCase().split(' ');
    // Iterate over each of List item on which this pipe has to be applied. e.g. each item in ProcessOrderList
    return input.filter((obj) => {
        return searchTerms.every((term) => { // Iterate over values to be looked in.
            return props.some((prop) => {
                const value = extractDeepPropertyByMapKey(obj, prop),
                strValue: string = String(value).toLowerCase();

                if (isUndefined(value)) {
                return false;
                }

                return strict
                ? term === strValue
                // tslint:disable-next-line:no-bitwise
                : !!~strValue.indexOf(term);
            }); // some
        }); // every
    }); // filter
  }
}
