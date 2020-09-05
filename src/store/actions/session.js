import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";
const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



export const setStateSession = (time) => {
    return {
        type: actionTypes.SET_STATE_SESSION,
        time: time
    }
}

export const endStateSession = () => {
    return {
        type: actionTypes.END_STATE_SESSION,
    }
}

export const startSession = (tasks, partners, location, updateTime, prevTime, userId) => {
    return dispatch => {

        let currentSession = null;

        if (updateTime) {
            let d = new Date();
            let hr = d.getHours();
            let min = d.getMinutes();
            if (min < 10) {
                min = "0" + min;
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
            let year = d.getFullYear()

            let currTime = `${month} ${date}, ${year}, ${hr}:${min} ${ampm}`;
            dispatch(setStateSession(currTime));

            currentSession = {
                sessionStarted: true,
                sessionStartTime: currTime,
                tasks: tasks,
                studyPartners: partners,
                location: location
            }

        } else {
            currentSession = {
                sessionStarted: true,
                sessionStartTime: prevTime,
                tasks: tasks,
                studyPartners: partners,
                location: location
            } 
        }

        axios.patch(`/${userId}/todaysSession.json`, currentSession)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }

}

export const finishedSession = (orderedtasks, studyPartners, location, start, end, userId) => {
    return dispatch => {
        dispatch(endStateSession());
        const tasks = [...orderedtasks];
        const newTasks = [];
        const sessionTasks = [];


        for(let i = 0; i < tasks.length; i++){
            sessionTasks.push(tasks[i][0]);
            let totalTimeInMins = (+tasks[i][0].hr * 60) + +tasks[i][0].min;
            if(!tasks[i][0].finished){
                let totalTimeSpentInMins = (+tasks[i][0].timeSpentHr* 60) + +tasks[i][0].timeSpentMin;
                if(totalTimeSpentInMins >= totalTimeInMins){
                    tasks[i][0].hr = 0;
                    tasks[i][0].min = 0;
                } else {
                    tasks[i][0].hr = Math.floor((totalTimeInMins - totalTimeSpentInMins) / 60);
                    tasks[i][0].min = (totalTimeInMins - totalTimeSpentInMins) - tasks[i][0].hr * 60;
                }

                const task = {...tasks[i][0]};
                task.timeSpentHr = ""
                task.timeSpentMin = "";
                newTasks.push(task);;
            }         
        }



        const newSession = {
            tasks: newTasks,
            location: "",
            studyPartners: [],
            sessionStarted: false,
            sessionStartTime: ""

        }
        axios.patch(`/${userId}/todaysSession.json`, newSession)
        .then((response) => {
        })
        .catch((error) => {
            console.log(error);
        })

        const finishedSession = {
            tasks: sessionTasks,
            location: location,
            studyPartners: studyPartners,
            start: start,
            end: end
        }
        
        axios.post(`/${userId}/sessions.json`, finishedSession)
        .then((response) => {

        })
        .catch((error) => {
            console.log(error);
        })
    }
}