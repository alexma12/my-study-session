import * as actionTypes from "./actionTypes"
import axios from "../../axios/axios";

export const initSessions = (sessions) => {
    return {
        type: actionTypes.INIT_SESSIONS,
        sessions: sessions,
    }
}

export const retrieveSessions = (userId) => {
    return dispatch => {
        axios.get(`/${userId}/sessions.json`)
        .then((response) =>{
            const sessions = []
            for(let sessionId in response.data){
                sessions.push(response.data[sessionId])
            }
            dispatch(initSessions(sessions));
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
