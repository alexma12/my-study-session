import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import EndSessionModal from "../Modal/EndSessionModal";
import SessionTask from "../SessionTask/SessionTask";

import * as actions from "../../store/actions";

const Session = (props) => {

  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    props.initStudyState(props.userId);
  }, []);

   const onEndSession = () => {
    setDisplayModal(true);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  let totalTimeInMins = 0;

  if (props.tasks) {
    for (let task of props.tasks) {
      totalTimeInMins = totalTimeInMins + (+task.hr || 0) * 60;
      totalTimeInMins = totalTimeInMins + (+task.min || 0);
    }
  }

  const totalHours = Math.floor(totalTimeInMins / 60);
  const totalMins = totalTimeInMins - (totalHours * 60);

  // Calculate priority 

  let tasks = null;
  let sortedTasks = null;
  const priorityTasksArray = []
  if(props.tasks){
  for (let task of props.tasks) {
    let rank = 0;
    if (task.urgent && task.important) {
      rank += 4000;
    } else if (task.urgent) {
      rank += 3000;
    } else if (task.important) {
      rank += 2000;
    } else {
      rank += 1000;
    }
    rank += +task.hr;
    rank += +task.min * 0.01;
    priorityTasksArray.push([task, rank]);
  }
  sortedTasks = priorityTasksArray.sort((a, b) => b[1] - a[1]);
  let index = 0;
  tasks = sortedTasks.map((task) => {
    index++;
    return (
      <SessionTask
        key={task[0].id}
        index={index}
        value={task[0].value}
        id={task[0].id}
        min={task[0].min}
        hr={task[0].hr}
        urgent={task[0].urgent}
        important={task[0].important}
        finished={task[0].finished}
        onFinish={() => props.onSetFinished(task[0].id, props.tasks)} />
    )
  })
}

  return (
    <div className="Session">
      <CSSTransition in={displayModal} classNames="fade" mountOnEnter unmountOnExit timeout={1000}>
        <EndSessionModal 
          key="endModal"
          onExit = {() => setDisplayModal(false)}
          time = {props.sessionStartTime}
          tasks = {sortedTasks}
          location = {props.location}
          history = {props.history}
          studyPartners = {props.studyPartners}
        />
      </CSSTransition>
      <div className="SessionWhiteboard">
        <div className="Session__time">
          START: <span className="Session__time-content"> {props.sessionStartTime} </span>
        </div>

        <div className="Session__approx-time">
          SESSION TIME: <span className="Session__approx-time-content"> {totalHours} {(totalHours == 1) ? "hr" : "hrs"} {totalMins} {(totalMins === 1) ? "min" : "mins"} </span>
        </div>
        <div className="Session__tasks">
          {tasks}
        </div>
        <div className="Session__buttons">
          <span onClick={() =>  props.history.push("/")} className="Session__buttons--btn">
            Edit Session
            </span>
          <span onClick={onEndSession} className="Session__buttons--btn">
            End Session
            </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    studyPartners: state.studyPartners.studyPartners,
    location: state.ui.locationValue,
    sessionStartTime: state.session.sessionStartTime,
    flashMessage: state.homeFlash.flashMessage,
    subMessage: state.homeFlash.subMessage,
    isError: state.homeFlash.isError,
    showMessage: state.homeFlash.showMessage,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initStudyState: (userId) => dispatch(actions.initStudyState(userId)),
    onSetFinished: (id, tasks) => dispatch(actions.setFinished(id, tasks))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Session);