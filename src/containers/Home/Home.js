import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import FlipMove from 'react-flip-move';

import FlashMessage from "../FlashMessage/FlashMessage"
import PaperBackground from "../backgrounds/PaperBackground/PaperBackground";
import LocationSticky from "./LocationSticky/LocationSticky";
import StudyPartnersSticky from "./StudyPartnersSticky/StudyPartnersSticky";
import TodoSticky from "./TodoSticky/TodoSticky";
import HighlightButton from "../HighlightButton/HighlightButton.js";
import StartSessionModal from "../Modal/StartSessionModal";

import { ReactComponent as ClockIcon } from "../../imgs/svg/clock.svg"
import { ReactComponent as TaskLiskIcon } from "../../imgs/svg/task-list.svg";
import { ReactComponent as PlusIcon } from "../../imgs/svg/cross.svg";

import * as actions from "../../store/actions"


const Home = (props) => {

    const [startAnim, setStartAnim] = useState(false);
    const [allowStartSession, setAllowStartSession] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [sessionLoading, setSessionLoading] = useState(false);


    useEffect(() => {

        setTimeout(() => {
            setStartAnim(true);
            props.initStudyState(props.userId);
        }, 1500)
        return (() => props.onCloseFlashMessage())
        //if(props.messageError) passing in prop
    }, []);

    // Modal //

    const modalStartSessionHandler = () => {

        props.onStartSession(props.tasks, props.studyPartners, props.location, false, props.sessionStartTime, props.userId);
        setSessionLoading(true);
        setTimeout(() => {
            setSessionLoading(false);
            props.history.replace("/session");
        }, 1000)

    }

    const exitModalHandler = () => {
        setDisplayModal(false);
    }

    const updateSessionTimeHandler = () => {
        props.onStartSession(props.tasks, props.studyPartners, props.location, true, "", props.userId);
        setSessionLoading(true);
        setTimeout(() => {
            setSessionLoading(false);
            props.history.replace("/session");
        }, 1000)
    }

    const logoutHandler = () => {
        props.refreshStudyState()
        props.onLogout()
    }

    // Session Start //

    const startSessionHandler = () => {
        if (props.sessionStarted) {
            setDisplayModal(true);
        } else {
            props.onStartSession(props.tasks, props.studyPartners, props.location, true, "", props.userId);
            setTimeout(() => {
                props.history.replace("/session");
            }, 500)

        }
    }

    // Task Functions //

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

    if (props.tasks) {
        let validArray = props.tasks.filter((task) => {
            return (task.value.trim() !== "" && task.min !== "" && task.hr !== "")
        });
        if (allowStartSession !== true && props.tasks.length > 0 && validArray.length === props.tasks.length) {
            setAllowStartSession(true);
        }
        if (allowStartSession === true && (props.tasks.length === 0 || validArray.length !== props.tasks.length)) {
            setAllowStartSession(false);
        }
    }

    // Time Functions //

    let totalTimeInMins = 0;

    if (props.tasks) {
        for (let task of props.tasks) {
            totalTimeInMins = totalTimeInMins + (+task.hr || 0) * 60;
            totalTimeInMins = totalTimeInMins + (+task.min || 0);
        }
    }

    const totalHours = Math.floor(totalTimeInMins / 60);
    const totalMins = totalTimeInMins - (totalHours * 60);

    // Flash Message // 

    return (
        <div className="Home" >
            <CSSTransition in={displayModal} classNames="fade" mountOnEnter unmountOnExit timeout={1000}>
                <StartSessionModal key="startModal"
                    loading={sessionLoading}
                    onExit={exitModalHandler}
                    noUpdate={modalStartSessionHandler}
                    withUpdate={updateSessionTimeHandler}
                    time={props.sessionStartTime}
                />
            </CSSTransition>
            <CSSTransition in={props.showMessage} classNames="fade" mountOnEnter timeout={1000}>
                <FlashMessage key="flashMessage"
                    clicked={props.onCloseFlashMessage}
                    isError={props.isError}
                    message={props.flashMessage}
                    subMessage={props.subMessage} />
            </CSSTransition>
            <PaperBackground>
                <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={1000}>
                    <div>
                        <button className="MySessions__button" onClick={() => props.history.push("/my-sessions")}> My Sessions </button>
                    </div>
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fadeDown" mountOnEnter timeout={0}>
                    <div key="heading" className="heading-1 u-grid-column-2-3 u-justify-self-center u-margin-top-small">Study Session</div>
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={0} >
                    <div className="NameAndLogout">
                         <button className="Logout_button" onClick={logoutHandler}> Logout </button> 
                         <div className="Name"> {props.userName} </div>
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
                                <span className="Tasks__heading--text">
                                    Today's Session
                                </span>
                                <TaskLiskIcon className="Tasks__icon--right" />
                            </div>
                            <ClockIcon className="Tasks__icon--left" />
                            <div className="Tasks__heading--text-time">

                                <span className="u-margin-right-sm"> Total Time:  </span>
                                {totalHours} {(totalHours === 1) ? "hr" : "hrs"} {totalMins} {(totalMins === 1) ? "min" : "mins"}
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
                            <HighlightButton clicked={() => props.onSaveSession(props.tasks, props.studyPartners, props.location, props.sessionStarted, props.sessionStartTime, props.userId)} enabled={true}> Save Session </HighlightButton>
                            <HighlightButton clicked={allowStartSession && props.location.length > 0 ? startSessionHandler : () => props.onSetFlashMessage(true, "Make Sure All Inputs are Filled", "")}
                                enabled={allowStartSession && props.location.length > 0}> Start Session </HighlightButton>
                        </div>
                    </section>
                </CSSTransition>
            </PaperBackground>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        studyPartners: state.studyPartners.studyPartners,
        location: state.ui.locationValue,
        sessionStarted: state.session.sessionStarted,
        sessionStartTime: state.session.sessionStartTime,
        flashMessage: state.homeFlash.flashMessage,
        subMessage: state.homeFlash.subMessage,
        isError: state.homeFlash.isError,
        showMessage: state.homeFlash.showMessage,
        userId: state.auth.userId,
        userName: state.auth.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTaskHandler: () => dispatch(actions.addTask()),
        onRemoveTaskHandler: (id) => dispatch(actions.removeTask(id)),
        onTaskInputChanged: (id, newValue, value) => dispatch(actions.updateInput(id, newValue, value)),
        onUrgencyChanged: (id, value) => dispatch(actions.updateUrgency(id, value)),
        onSaveSession: (tasks, studyPartners, location, started, time, userId) => dispatch(actions.saveSession(tasks, studyPartners, location, started, time, userId)),
        onCloseFlashMessage: () => dispatch(actions.removeFlashMessage()),
        onSetFlashMessage: (isError, message, subMessage) => dispatch(actions.setFlashMessage(isError, message, subMessage)),
        onStartSession: (tasks, partners, location, updateTime, time, userId) => dispatch(actions.startSession(tasks, partners, location, updateTime, time, userId)),
        initStudyState: (userId) => dispatch(actions.initStudyState(userId)),
        refreshStudyState: () => dispatch(actions.refreshStudyState()),
        onLogout: () => dispatch(actions.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);