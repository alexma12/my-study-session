import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";
import { setFlashMessage, removeFlashMessage } from "./homeFlashMessages";


const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export const addTask = () => {
    return {
        type: actionTypes.ADD_TASK
    }
}

export const removeTask = (id) => {
    return {
        type: actionTypes.REMOVE_TASK,
        id: id
    }
}

export const updateUrgency = (id, value) => {
    return {
        type: actionTypes.TASK_UPDATE_URGENCY,
        id: id,
        value: value
    }
}


export const updateInput = (id, newValue, value) => {
    return {
        type: actionTypes.TASK_UPDATE_INPUT,
        id: id,
        newValue: newValue,
        value: value
    }
}

export const setStateTasks = (tasks) => {
    return {
        type: actionTypes.SET_STATE_TASKS,
        tasks: tasks
    }
}

export const updateTimeSpent = (id, value, config) => {
    return {
        type: actionTypes.TASK_UPDATE_TIME_SPENT,
        id: id,
        value: value,
        config: config
    }
}


export const saveSession = (tasks, studyPartners, location, started, time, userId) => {
    return dispatch => {
        const session = {
            tasks: tasks,
            studyPartners: studyPartners,
            location: location,
            sessionStartTime: time,
            sessionStarted: started
        }
        axios.put(`/${userId}/todaysSession.json`, session)
            .then(() => {
                let d = new Date();
                let hr = d.getHours();
                let min = d.getMinutes();
                let sec = d.getSeconds();
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                let ampm = "am";
                if (hr > 12) {
                    hr -= 12;
                    ampm = "pm";
                }
                if (hr === 0) {
                    hr = 12;
                }
                let date = d.getDate();
                let month = Month[d.getMonth()];
              
                let string = `${month} ${date}, ${hr}:${min}:${sec} ${ampm}: `;

                dispatch(removeFlashMessage())
                dispatch(setFlashMessage(false, string, "Successfully Saved Session"));
            })
            .catch(error => {
                dispatch(setFlashMessage(true, error.message));
            })
    }
}

export const setFinished = (id, tasks, userId) => {
    return dispatch => {
        let updatedTasks = [...tasks];
        for(let i = 0; i < updatedTasks.length; i++){
            if(updatedTasks[i].id === id){
                updatedTasks[i].finished =  !updatedTasks[i].finished;
            }
        }
        axios.put(`/${userId}/todaysSession/tasks.json`, updatedTasks)
        .then(() =>
        {
            dispatch(setStateTasks(updatedTasks))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

