export interface ICreateSessionRequestModel{
    successUrl: string;
    cancelUrl: string;
    currency: number;
    items: { id: number, quantity: number }[]
}