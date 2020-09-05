import React from "react";

const MySessionsTask = (props) => {

    let valueClasses = "";

    if(!props.important && !props.urgent){
        valueClasses = "MySessionsTask__value MySessionsTask__value--yellow"
    } else if (!props.important && props.urgent){
        valueClasses = "MySessionsTask__value MySessionsTask__value--green"
    } else if (props.important && !props.urgent){
        valueClasses = "MySessionsTask__value MySessionsTask__value--blue"
    } else {
        valueClasses = "MySessionsTask__value MySessionsTask__value--red"
    }
    
    return (
        <div className="MySessionsTask">
          <div className= {valueClasses}> {props.value}  </div>  
          <div className= "MySessionsTask__time">{props.timeSpentHr} {(props.timeSpentHr !== "1")? "hrs" : "hr"} {props.timeSpentMin}  {(props.timeSpentMin !== "1")? "mins" : "min"}</div>
        </div>)
}

export default MySessionsTask