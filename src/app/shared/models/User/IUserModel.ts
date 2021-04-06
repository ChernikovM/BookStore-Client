import { IBaseModel } from "../Base/IBaseModel";

export interface IUserModel extends IBaseModel{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    lockoutEnabled?: boolean;
    lockoutEnd?: Date;
}