import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import FlipMove from 'react-flip-move';

import PaperBackground from "../backgrounds/PaperBackground/PaperBackground";
import LocationSticky from "../LocationSticky/LocationSticky";
import StudyPartnersSticky from "../StudyPartnersSticky/StudyPartnersSticky";
import TodoSticky from "../TodoSticky/TodoSticky";
import HighlightButton from "../HighlightButton/HighlightButton.js"
import { ReactComponent as TaskLiskIcon } from "../../imgs/svg/task-list.svg";
import { ReactComponent as PlusIcon } from "../../imgs/svg/cross.svg";

import * as actions from "../../store/actions"

const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"];
const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Home = (props) => {

  //  const [taskInputs, setTaskInputs] = useState([]);
    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartAnim(true);
        }, 1200)
    }, []);


    // Task Fucntions //
/*
    const onAddTaskHandler = () => {
        const id = `${Math.random()}_${new Date().getTime()}`
        const newTask = { id: id, value: "", hr: "", min: "", urgent: false, important: false };
        setTaskInputs([...taskInputs, newTask]);
    }

    const onUrgencyChanged = (id, value) => {
        const newTaskInputs = [...taskInputs]
        for (let i = 0; i < newTaskInputs.length; i++) {
            if (newTaskInputs[i].id === id) {
                newTaskInputs[i][value] = !newTaskInputs[i][value];
            }
        }
        setTaskInputs(newTaskInputs);
    }

    const onTaskInputChanged = (id, newValue, value) => {
        if (value !== "value" && (newValue.length > 2 || +newValue < 0 || (value === "min" && +newValue > 59))) {
            return
        }
        const newTaskInputs = [...taskInputs]
        for (let i = 0; i < newTaskInputs.length; i++) {
            if (newTaskInputs[i].id === id) {
                newTaskInputs[i][value] = newValue;
            }
        }
        setTaskInputs(newTaskInputs);
    }


    const onDeleteTaskHandler = (id) => {
        const newTaskInputs = taskInputs.filter(task => {
            return (task.id !== id)
        })

        setTaskInputs(newTaskInputs);
    }
*/
    console.log(props.tasks + "qw");
    let tasks = <div className="Tasks__NoneSticky"> No Tasks </div>;
    if (props.tasks && props.tasks.length > 0) {
        tasks =
            props.tasks.map((task) => {
                return (
                    <TodoSticky
                        key={task.id}
                        value={task.value}
                        id={task.id}
                        changed={props.onTaskInputChanged}
                        min={task.min}
                        hr={task.hr}
                        urgent={task.urgent}
                        important={task.important}
                        onUrgencyChanged={props.onUrgencyChanged}
                        onDelete={props.onRemoveTaskHandler} />
                )
            });

    }

    let totalTimeInMins = 0;

    if(props.tasks){
    for(let task of props.tasks){
        totalTimeInMins = totalTimeInMins + (+task.hr || 0) * 60;
        totalTimeInMins = totalTimeInMins + (+task.min || 0);
    }
}

    const totalHours = Math.floor(totalTimeInMins / 60);
    const totalMins = totalTimeInMins - (totalHours * 60);

    const date = new Date()
    const dateString = `${Day[date.getDay()]}, ${Month[date.getMonth()]} ${date.getDate()} `;

    return (
        <div className="Home" >
            <PaperBackground>
                <CSSTransition in={startAnim} classNames="fadeDown" mountOnEnter timeout={0}>
                    <div key="heading" className="heading-1 u-grid-column-2-3 u-justify-self-center u-margin-top-small">Study Session</div>
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fadeLeft" mountOnEnter timeout={0} >
                    <div className="Date" key="date">
                        {dateString}
                    </div>
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={0}>
                    <section className="Information">
                        <LocationSticky />
                        <StudyPartnersSticky />
                    </section>
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={0} >
                    <section key="tasks" className="Tasks">
                        <h2 className="Tasks__heading">
                            <div>
                            <span className = "Tasks__heading--text">
                                TODAY'S SESSION
                            </span>
                            <TaskLiskIcon className="Tasks__icon" />
                            </div>
                            <div className = "Tasks__heading--text-time">
                                <span className = "u-margin-right-sm"> Total Time:  </span>       
                                {totalHours} {(totalHours === 1)? "hr" : "hrs"} {totalMins} {(totalMins === 1)? "min" : "mins"}
                            </div>
                        </h2>
                        <div className="Tasks__content">
                            <FlipMove className="Tasks__todos"
                                appearAnimation="fade"
                                enterAnimation="fade"
                                leaveAnimation="elevator"
                                duration={440}
                            >
                                {tasks}
                            </FlipMove>
                            <div className="Tasks__plusIcon-box">
                                <button className="Tasks__plusIcon-button" onClick={props.onAddTaskHandler}>
                                    <PlusIcon className="Tasks__plusIcon" />
                                </button>
                            </div>
                        </div>
                        <div className="Tasks__buttons">
                            <HighlightButton enabled = {false}> Save Session </HighlightButton>
                            <HighlightButton enabled = {props.tasks && props.tasks.length > 0}> Start Session </HighlightButton>
                        </div>
                    </section>
                </CSSTransition>
            </PaperBackground>
        </div >
    )
}

const mapStateToProps = state => {
    return{
        tasks: state.tasks.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddTaskHandler: () => dispatch(actions.addTask()),
        onRemoveTaskHandler: (id) => dispatch(actions.removeTask(id)),
        onTaskInputChanged: (id, newValue, value) => dispatch(actions.updateInput(id,newValue,value)),
        onUrgencyChanged: (id, value) => dispatch(actions.updateUrgency(id, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);