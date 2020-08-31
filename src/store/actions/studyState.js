import * as actionTypes from "./actionTypes"

import { setStateTasks } from "./tasks";
import { locationInputChanged } from "./userInput";
import { setStateStudyPartners } from "./studyPartners";
import { setFlashMessage } from "./homeFlashMessages";
import { setStateSession, endStateSession } from "./session";
import { setUserName } from "./auth"

import axios from "../../axios/axios"

export const initStudyState = (userId) => {
    return dispatch => {
        if(userId){
        axios.get(`/${userId}.json`)
        .then((response) => {
            console.log(response);
            if(response.data.todaysSession.tasks){
                dispatch(setStateTasks(response.data.todaysSession.tasks))
            }
            if(response.data.todaysSession.studyPartners){
                dispatch(setStateStudyPartners(response.data.todaysSession.studyPartners))
            }         
            dispatch(locationInputChanged(response.data.todaysSession.location))
            if(response.data.todaysSession.sessionStarted){
                dispatch(setStateSession(response.data.todaysSession.sessionStartTime))
            }
            dispatch(setUserName(response.data.name))
        })
        .catch((err) => {
            console.log(err);
            dispatch(setFlashMessage(true, "An Error Occured Retrieving Your Saved Session"))
        })
    }
}
}

export const refreshStudyState = () => {
    return dispatch => {
            dispatch(setStateTasks([]));
            dispatch(locationInputChanged(""));
            dispatch(setStateStudyPartners([]));
            dispatch(endStateSession());
            dispatch(setUserName(""));
        }
}


