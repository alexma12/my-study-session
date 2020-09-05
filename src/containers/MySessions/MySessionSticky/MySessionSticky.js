import React from "react";

import MySessionTask from "../MySessionsTask/MySessionsTask";

const MySessionSticky = (props) => {


    let studyPartnersString = "";
    if (props.studyPartners) {
        let studyPartnersArray = [];
        for (let partner of props.studyPartners) {
            studyPartnersArray.push(partner.name)
        }
        studyPartnersString = studyPartnersArray.join(", ")
    } else {
        studyPartnersString = "None"
    }

    let finishedTasksArray = [];
    let unfinishedTasksArray = [];
    let studyingTime = 0;
    for (let task in props.tasks) {
        studyingTime += +props.tasks[task].timeSpentHr * 60;
        studyingTime += +props.tasks[task].timeSpentMin;
        if (props.tasks[task].finished) {
            finishedTasksArray.push(props.tasks[task])
        } else {
            unfinishedTasksArray.push(props.tasks[task])
        }
    }

    let finishedTasks = null;
    if (finishedTasksArray.length > 0) {
        finishedTasks = finishedTasksArray.map(task => {
            return (<MySessionTask {...task} />)
        })
    } else {
        finishedTasks = <div> None </div>
    }

    let unfinishedTasks = null;
    if (unfinishedTasksArray.length > 0) {
        unfinishedTasks = unfinishedTasksArray.map(task => {
            return (<MySessionTask {...task} />)
        })
    } else {
        unfinishedTasks = <div> None </div>
    }

    let studyingTimeHour = Math.floor(studyingTime / 60);
    let studyingTimeMin = studyingTime - studyingTimeHour * 60


    return (
        <div className="MySessionSticky">
            <div className="MySessionSticky__time">
                <strong> {props.start} - {props.end} </strong>
            </div>
            <div className="MySessionSticky__info-box">
                <div className="MySessionSticky__location">
                    <strong className="MySessionSticky__location--label"> Location </strong>
                    <div className="MySessionSticky__location--content"> {props.location} </div>
                </div>
                <div className="MySessionSticky__studyPartners">
                    <strong className="MySessionSticky__studyPartners--label"> Study-Partners </strong>
                    <div className="MySessionSticky__studyPartners--content"> {studyPartnersString} </div>
                </div>
            </div>

            <div className="MySessionSticky__task-box">
                <div className="MySessionSticky__finishedTasks">
                    <strong className="MySessionSticky__finishedTasks--label"> Completed Tasks </strong>
                    <div className="MySessionSticky__finishedTasks--content"> {finishedTasks} </div>
                </div>
                <div className="MySessionSticky__unfinishedTasks">
                    <strong className="MySessionSticky__unfinishedTasks--label"> Incomplete Tasks </strong>
                    <div className="MySessionSticky__unfinishedTasks--content">{unfinishedTasks}</div>
                </div>
            </div>

            <div className="MySessionSticky__timeSpent">
                <strong> Total Study Time: {studyingTimeHour} hrs {studyingTimeMin} mins </strong>
            </div>
        </div >
    )
}

export default MySessionSticky;