import { Injectable, NgZone } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouterService {
  constructor(private _ngZone: NgZone, private _router: Router){}

  navigateInZone(commands: any[], extras?: NavigationExtras | undefined): Promise<boolean>{
      this._router.onSameUrlNavigation = 'reload';
      
      return this._ngZone.run(() => {
        return this._router.navigate(commands, extras);
      });
  }

  get url() : string{
      return this._router.url;
  }
}