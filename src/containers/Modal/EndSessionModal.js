import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import * as actions from "../../store/actions";
import EndSessionTask from "../Session/EndSessionTask/EndSessionTask";
import Spinner from "../Spinner/Spinner";
import FlashMessage from "../FlashMessage/FlashMessage";


const EndSessionModal = (props) => {
    const [activeButton, setActiveButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);


    useEffect(() => {
        console.log(props.userId)
        return(() => {
            setShowMessage(false);
        })
    }, [])

    const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

    const onSessionFinish = () => {
        setIsLoading(true);
        if(props.tasks){
        props.onFinishedSession(props.tasks, props.studyPartners, props.location, props.time, currTime, props.userId);
        }
        setInterval(() => {
            setIsLoading(false);
            props.history.replace("/");
            window.location.reload();

        }, 1000)
    }


    // Finish Button 
    let finishButton =
        <div onClick={activeButton ? onSessionFinish : () => setShowMessage(true)} className={activeButton ? "EndSessionModal__finish EndSessionModal__finish--active" : "EndSessionModal__finish EndSessionModal__finish--disabled"} >
            Finish Session
        </div>

    if (isLoading) {
        finishButton = <Spinner />;
    }


    // Study Partners 

    let studyPartners = null;
    if (props.studyPartners.length > 0) {
        studyPartners = props.studyPartners.map((partner) => {
            return (<div key={partner.id} className="EndSessionModal__info--studyPartners-content"> {partner.name} </div>)
        })
    } else {
        studyPartners = <div className="EndSessionModal__info--studyPartners-content"> None </div>
    }


    // Tasks 

    if (props.unOrderedTasks) {
        const filteredTasks = props.unOrderedTasks.filter((task) => {
            return (task.timeSpentMin !== "" && task.timeSpentHr !== "")
        })

        if (!activeButton && filteredTasks.length === props.unOrderedTasks.length) {
            setActiveButton(true);
        }

        if (activeButton && filteredTasks.length !== props.unOrderedTasks.length) {
            setActiveButton(false);
        }
    }

    const tasks = props.tasks.map((task) => {
        return (<EndSessionTask value={task[0].value}
            key={`EndSessionTask__${task[0].id}`}
            id={task[0].id}
            finished={task[0].finished}
            urgent={task[0].urgent}
            important={task[0].important}
            hr={task[0].timeSpentHr}
            min={task[0].timeSpentMin}
            changed={props.onInputChanged}
        />)
    })


    return (
        <div className="EndSessionModal">        
        <CSSTransition in={showMessage} classNames="fade" mountOnEnter timeout={1000}>
        <FlashMessage key="flashMessage-1"
            clicked={() => setShowMessage(false)}
            isError={true}
            message={"You Must Enter Your Time Spent For Each Tasks"}
            subMessage={""} />
        </CSSTransition>
            <div className="EndSessionModal__content">
                <span className="EndSessionModal__exit" onClick={props.onExit}> X </span>
                <div className="EndSessionModal__start">
                    Start Time:  <span className="EndSessionModal__time" >{props.time}</span>
                </div>
                <div className="EndSessionModal__info">
                    <div className="EndSessionModal__info--location">
                        <div className="EndSessionModal__info--location-label"> Location </div>
                        <div className="EndSessionModal__info--location-content"> {props.location} </div>
                    </div>

                    <div className="EndSessionModal__info--studyPartners">
                        <div className="EndSessionModal__info--studyPartners-label"> Study-Partners </div>
                        {studyPartners}
                    </div>
                </div>

                <div className="EndSessionModal__tasks">
                    <div className="EndSessionModal__tasks-label"> Tasks </div>
                    {tasks}
                </div>

                <div className="EndSessionModal__end">
                    End Time:  <span className="EndSessionModal__end-time" > {currTime} </span>
                </div>
                {finishButton}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        unOrderedTasks: state.tasks.tasks,
        userId: state.auth.userId,
       }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputChanged: (id, value, config) => dispatch(actions.updateTimeSpent(id, value, config)),
        onFinishedSession: (tasks, partners, location, start, end, userId) => dispatch(actions.finishedSession(tasks, partners, location, start, end, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndSessionModal);