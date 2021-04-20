
import { PaymentState, PaymentStateModel } from "./payment/payment.state";
import { SharedState } from "./shared/shared.state";
import { UsersState } from "./users/users.state";
import { ViewCollectionState } from "./viewCollection/view-collection.state";
import { ViewDetailsState } from "./viewDetails/view-details.state";

export const states = [
    ViewCollectionState,
    UsersState,
    ViewDetailsState,
    PaymentState,
    SharedState
    
    //TODO: add states here
]