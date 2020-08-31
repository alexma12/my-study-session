import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isError: false,
    flashMessage: "",
    subMessage: "",
    showMessage: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_HOME_FLASH_MESSAGE:
            {
                const newState = {...state}
                newState.isError = action.isError;
                newState.flashMessage = action.flashMessage;
                newState.subMessage = action.subMessage;
                newState.showMessage = true;
                return (newState);
            }

        case actionTypes.REMOVE_HOME_FLASH_MESSAGE:
            {
                const newState = {...state}
                newState.showMessage = false;
                return (newState);
            }

        default: return state
    }

}

export default reducer;
