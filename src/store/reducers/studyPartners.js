import * as actionTypes from "../actions/actionTypes";

const initialState = {
    studyPartners: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STUDY_PARTNER:
            {
                const newState = { ...state };
                const newPartner = {
                    name: action.name,
                    id: action.id
                }

                newState.studyPartners = [...state.studyPartners, newPartner];
                return (newState);
            }

        case actionTypes.REMOVE_STUDY_PARTNER:
            {
                const newState = { ...state };
                newState.studyPartners =
                    state.studyPartners.filter((studyPartner) => studyPartner.id !== action.id);
                return (newState);
            }
        

        default: return state;
    }
}
export default reducer

