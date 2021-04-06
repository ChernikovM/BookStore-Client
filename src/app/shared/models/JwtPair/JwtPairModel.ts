export class JwtPairModel{
    constructor( 
        public accessToken: string, 
        public refreshToken: string
        ) {}
}