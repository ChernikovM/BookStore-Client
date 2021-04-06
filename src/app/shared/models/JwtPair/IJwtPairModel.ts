import { IBaseModel } from "../Base/IBaseModel";

export interface IJwtPairModel extends IBaseModel{
    accessToken: string;
    refreshToken: string;
}