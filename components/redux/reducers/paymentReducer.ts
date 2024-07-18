import ActionTypes from "../actions/ActionTypes";

const initalState = {
    profile: {
        fullname: "",
        contact: 0,
    },
    payment: {
        vpa: "",
        paypal: "",
    },
    lastFetched: 0,
};

export const paymentReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_PROFILE_DATA:

            return {
                ...state,
                profile: {
                    fullname: action.payload.fullname,
                    contact: action.payload.contact,
                },
            };

        case ActionTypes.SET_PAYMENT_DATA:

            return {
                ...state,
                payment: {
                    vpa: action.payload.vpa,
                    paypal: action.payload.paypal,
                },
            };

        case ActionTypes.CLEAR_PAYMENT_DATA:
            return initalState;

        default:
            return state;
    }
};
