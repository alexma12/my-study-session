import * as actionTypes from "./actionTypes"

export const studyPartnersInputChanged = (newValue) => {
    return {
        type: actionTypes.STUDY_PARTNERS_INPUT_CHANGED,
        newValue: newValue
    }
}

export const locationInputChanged = (newValue) => {
    return {
        type: actionTypes.LOCATION_INPUT_CHANGED,
        newValue: newValue
    }
}

