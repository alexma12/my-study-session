import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    name: "",
};

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.AUTH_FAIL: 
        {
            const newState = {...state};
            newState.error = action.error;
            newState.loading = false
            return(newState);
        }

        case actionTypes.AUTH_LOGOUT:
        {
            const newState = {...state};
            newState.token = null;
            newState.userId = null;
            return(newState);
        }

        case actionTypes.AUTH_START:
        {
            const newState = {...state};
            newState.error = null;
            newState.loading = true;
        }


        case actionTypes.AUTH_SUCCESS:
        {
            const newState = {...state};
            newState.token = action.token;
            newState.userId = action.userId;
            newState.error = null;
            newState.loading = false;
            return(newState)
        }

        case actionTypes.SET_USER_NAME:
        {
            const newState = {...state};
            newState.name = action.name
            return(newState)
        }

        default: 
            return (state)
    }
}

export default reducer
