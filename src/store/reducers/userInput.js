import * as actionTypes from "../actions/actionTypes"

const initialState = {
    studyPartnersValue: "",
    locationValue: "",
    allowSaveSession: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.STUDY_PARTNERS_INPUT_CHANGED:
            {
                const newValue = action.newValue;
                const newState = { ...state }
                newState.studyPartnersValue = newValue;
                return (newState);
            }

        case actionTypes.LOCATION_INPUT_CHANGED:
            {
                const newValue = action.newValue
                const newState = { ...state };
                newState.locationValue = newValue;
                return (newState);
            }

        default: return state
    }

}

export default reducer