import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): {key: number, value: string}[] {

    let result: {key: number, value: string}[] = [];
    
    let counter: number = Object.keys(value).length / 2;

    for(let i = 0; i < counter; ++i){
      result.push({key: i, value: value[i]});
    }
   
    return result;
  }

}
