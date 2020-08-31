import * as actionTypes from "./actionTypes"

export const addStudyPartner = (name, id) => {
    return {
        type: actionTypes.ADD_STUDY_PARTNER,
        name: name,
        id: id
    }
}

export const removeStudyPartner = (id) => {
    return {
        type: actionTypes.REMOVE_STUDY_PARTNER,
        id: id
    }
}

export const setStateStudyPartners = (studyPartners) => {
    return {
        type: actionTypes.SET_STATE_STUDY_PARTNERS,
        studyPartners: studyPartners
    }
}

