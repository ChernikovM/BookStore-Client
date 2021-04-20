// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44366', // or 49342 port
  defaultPageSize: 10,
  availablePageSizes: [5, 10, 20, 50, 100],
  stripeApiPrivateKey: 'pk_test_51Ifj5GBJEyP0eqN2uusoQNPr54Na9JDwAaBuzuLUK37EPTDRduWiRtnElDhhDHf4IPOh1Qg7ZNPuy48xG6H0yjNB002dck5rbo',
  paymentSuccessUrl: 'http://localhost:4200/paymentSuccess',
  paymentCancelUrl: 'http://localhost:4200/paymentCancel',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
