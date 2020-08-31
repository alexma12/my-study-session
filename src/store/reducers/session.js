import * as actionTypes from "../actions/actionTypes";

const initialState = {
    sessionStarted: false,
    sessionStartTime: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_STATE_SESSION:
            {
                const newState = {...state}
                newState.sessionStartTime = action.time
                newState.sessionStarted = true;
                return (newState);
            }

        case actionTypes.END_STATE_SESSION:
            {
                const newState = {...state}
                newState.sessionStartTime = ""
                newState.sessionStarted = false;
                return (newState);
            }

        default: return state
    }

}

export default reducer;
