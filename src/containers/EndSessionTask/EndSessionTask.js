import React from "react"

const endSessionTask = (props) => {

    let valueClass = ""
    if (!props.urgent && !props.important) {
        valueClass = "EndSessionTask__value EndSessionTask__value--yellow";
    }
    if (!props.urgent && props.important) {
        valueClass = "EndSessionTask__value EndSessionTask__value--blue";

    } else if (props.urgent && !props.important) {
        valueClass = "EndSessionTask__value EndSessionTask__value--green";

    } else if (props.urgent && props.important) {
        valueClass = "EndSessionTask__value EndSessionTask__value--red";
    }

    return (
        <div className="EndSessionTask">
            <div className={valueClass} > {props.value} </div>
            <div className={props.finished ? "EndSessionTask__complete" : "EndSessionTask__incomplete"} > {props.finished ? "Complete" : "Incomplete"} </div>
            <div className="EndSessionTask__time" >
                <div>time spent:</div>
                <input
                    id={props.id}
                    className="EndSessionTask__time--input"
                    type="number"
                    value={props.hr}
                    placeholder="##"
                    onChange={(event) => props.changed(event.target.id, event.target.value, "timeSpentHr")} />

                {(props.hr !== "1") ? "hrs" : "hr"}

                <input
                    id={props.id}
                    className="EndSessionTask__time--input"
                    type="number"
                    value={props.min}
                    placeholder="##"
                    onChange={(event) => props.changed(event.target.id, event.target.value, "timeSpentMin")} />
                {(props.min !== "1") ? "mins" : "min"}
            </div>
        </div>
    )
}

export default endSessionTask