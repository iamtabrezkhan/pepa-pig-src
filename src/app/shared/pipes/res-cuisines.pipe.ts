import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resCuisines'
})
export class ResCuisinesPipe implements PipeTransform {

  transform(cuisines: any): any {
    if(!cuisines) {
      return null;
    }
    let cuisinesArray = cuisines.split(', ');
    if(cuisinesArray.length > 3) {
      return `${cuisinesArray[0]}, ${cuisinesArray[1]}, ${cuisinesArray[2]}...`
    } else {
      return `${cuisinesArray.join(', ')}`
    }
  }

}
