import { IRegistrationModel } from "./IRegistrationModel";

export class RegistrationModel implements IRegistrationModel{
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;

    constructor(){
        this.firstname = "";
        this.lastname = "";
        this.username = "";
        this.email = "";
        this.password = "";
    }
}