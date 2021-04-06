import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleErrors(errors: any[]){
    if(errors){
      for(let prop in errors){
        if(errors[prop] instanceof Object){
          for(let p in errors[prop]){
            console.log(errors[prop][p]);
            alert(errors[prop][p]);
          }
          continue;
        }
        console.log(errors[prop]);
        alert(errors[prop]);
      }

    }
  }
  
}
