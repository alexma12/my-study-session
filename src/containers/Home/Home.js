import React, { useEffect, useState, useRef} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import PaperBackground from "../backgrounds/PaperBackground/PaperBackground";
import LocationSticky from "../LocationSticky/LocationSticky";
import StudyPartnersSticky from "../StudyPartnersSticky/StudyPartnersSticky";
import {ReactComponent as TaskLiskIcon} from "../../imgs/svg/task-list.svg";
import {ReactComponent as PlusIcon} from "../../imgs/svg/cross.svg";

const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"];
const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Home = () => {

    const [startAnim, setStartAnim] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setStartAnim(true);
        }, 1200)
    }, []);


    const date = new Date()
    const dateString = `${Day[date.getDay()]}, ${Month[date.getMonth()]} ${date.getDate()} `;

    return (
        <div className = "Home" >
           <PaperBackground>
           <CSSTransition  in = {startAnim} classNames = "fadeDown" mountOnEnter>
                <div key = "heading" className = "heading-1 u-grid-column-2-3 u-justify-self-center u-margin-top-small">Study Session</div>
            </CSSTransition>
            <CSSTransition in = {startAnim} classNames = "fadeLeft" mountOnEnter >
                <div className = "Date" key = "date">
                {dateString} 
                </div>
            </CSSTransition>
            <CSSTransition in = {startAnim} classNames = "fade" mountOnEnter >
            <section className="Information">
            <LocationSticky />
            <StudyPartnersSticky />
            </section>
            </CSSTransition>
            <CSSTransition in = {startAnim} classNames = "fade" mountOnEnter >
            <section key = "tasks" className="Tasks">
                <h2 className = "Tasks__heading">
                    TODAY'S SESSION
                    <TaskLiskIcon className = "Tasks__icon" />
                </h2>
                <div className = "Tasks__content">
                    <div className="Tasks__NoneSticky">
                        No Tasks
                    </div>
                    <div className="Tasks__plusIcon-box">
                    <PlusIcon className = "Tasks__plusIcon"/>
                    </div>
                </div>
            </section>
            </CSSTransition>
           </PaperBackground>
        </div>
    )
}

export default Home 