import * as actionTypes from "../actions/actionTypes";

const initialState = {
    sessions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.INIT_SESSIONS:
            {
                const newState = {...state}
                newState.sessions = action.sessions
                return (newState);
            }

        default: return(state)
    }

}

export default reducer;
