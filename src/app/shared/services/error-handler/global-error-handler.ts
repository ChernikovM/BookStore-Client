import { HttpErrorResponse } from "@angular/common/http";
import { Inject, Injector } from "@angular/core";
import { ErrorHandler, Injectable } from "@angular/core";
import { isObject } from "@ngxs/store/src/internal/internals";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(@Inject(Injector) private injector: Injector){
        super();
    }

    private get _toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    handleError(error: any) {
        if(error instanceof HttpErrorResponse){
            this.handleHttpError(error);
        }
        else{
            this._toastrService.warning("Oops... Something went wrong.");
        }
    }


    private handleHttpError(error: HttpErrorResponse){
        if(error.status === 400){
            error.error.errors.forEach((element : any) => {
                this._toastrService.error(element);
            });
        }
        else{
            this._toastrService.error("Server error, please try later.");
        }
    }
}
