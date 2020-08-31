import React from "react";

import {ReactComponent as Checkmark} from "../../imgs/svg/checkmark.svg";

const SessionTask = (props) => {

    let sessionTaskClasses = null;

    if(!props.urgent && !props.important){
        sessionTaskClasses = "SessionTask SessionTask--yellow";
    }
    if (!props.urgent && props.important) {
        sessionTaskClasses = "SessionTask SessionTask--blue";

    } else if (props.urgent && !props.important) {
        sessionTaskClasses = "SessionTask SessionTask--green";

    } else if (props.urgent && props.important) {
        sessionTaskClasses = "SessionTask SessionTask--red";
    }

    if(props.finished){
        sessionTaskClasses += " SessionTask--complete";
    } else {
        sessionTaskClasses += " SessionTask--incomplete";
    }

    let iconClass = null; 

    if(!props.finished){
        iconClass = "SessionTask__icon"
    } else {
        iconClass = "SessionTask__icon SessionTask__icon-finished"
    }

    return (
        <div onClick = {props.onFinish} className={sessionTaskClasses} >
            <Checkmark className = {iconClass} />
            <p className = "SessionTask__value"> {props.index}. {props.value} </p>
            <p className = "SessionTask__time">  {props.hr} {(props.hr !== "1") ? "hrs" : "hr"} {props.min} {(props.min !== "1") ? "mins" : "min"}</p>
        </div>
    );
}




export default SessionTask 