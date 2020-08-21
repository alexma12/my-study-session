import React, { forwardRef } from "react";

const TodoSticky = forwardRef((props, ref) => {

    let todoStickyClasses = null;

    if(!props.urgent && !props.important){
        todoStickyClasses = "TodoSticky TodoSticky--yellow";
    }
    if (!props.urgent && props.important) {
        todoStickyClasses = "TodoSticky TodoSticky--blue";

    } else if (props.urgent && !props.important) {
        todoStickyClasses = "TodoSticky TodoSticky--green";

    } else if (props.urgent && props.important) {
        todoStickyClasses = "TodoSticky TodoSticky--red";
    }

    return (
        <div ref={ref} className={todoStickyClasses} >
            <textarea
                id={props.id}
                className="TodoSticky__textarea"
                rows="2"
                value={props.value}
                cols="50"
                placeholder="Enter Text Here"
                onChange={(event) => props.changed(event.target.id, event.target.value, "value")}
            />
            <div className="TodoSticky__time">
                <strong>Time:</strong>
                <input
                    id={props.id}
                    className="TodoSticky__time--input"
                    type="number"
                    value={props.hr}
                    onChange={(event) => props.changed(event.target.id, event.target.value, "hr")} />

                {(props.hr !== "1") ? "hrs" : "hr"}

                <input
                    id={props.id}
                    className="TodoSticky__time--input"
                    type="number"
                    value={props.min}
                    onChange={(event) => props.changed(event.target.id, event.target.value, "min")} />

                {(props.min !== "1") ? "mins" : "min"}

            </div>

            <div className="TodoSticky__urgency">
                <span>
                    <strong>Urgent?</strong>
                    <span
                        id={props.id}
                        className={props.urgent? "TodoSticky__urgency--checkbox TodoSticky__urgency--checkbox-checked" 
                                                : "TodoSticky__urgency--checkbox TodoSticky__urgency--checkbox-unchecked"}
                        type="checkbox"
                        onClick={(event) => props.onUrgencyChanged(event.target.id, "urgent")}
                    ></span>
                </span>
                <span>
                    <strong>Important?</strong>
                    <span
                        id={props.id}
                        className={props.important? "TodoSticky__urgency--checkbox TodoSticky__urgency--checkbox-checked" 
                                                : "TodoSticky__urgency--checkbox TodoSticky__urgency--checkbox-unchecked"}
                        type="checkbox"
                        onClick={(event) => props.onUrgencyChanged(event.target.id, "important")}
                    ></span>
                </span>
            </div>
            <button className="TodoSticky__delete" onClick={() => props.onDelete(props.id)}> Delete </button>
        </div>

    );
})


export default TodoSticky