import { ILoginModel } from "./ILoginModel";

export class LoginModel implements ILoginModel{
    username: string;
    password: string;
    remember? : boolean;

    constructor(){
        this.password = '';
        this.username = '';
        this.remember = true;
    }
}