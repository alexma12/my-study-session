import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import MySessionSticky from "./MySessionSticky/MySessionSticky";
import PaperBackground from "../backgrounds/PaperBackground/PaperBackground";


const MySessions = (props) => {

    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => {
        props.initSessions(props.userId)
        setTimeout(() => {
            setStartAnim(true);
        }, 1500)
    }, []);

    let sessions = <div className = "MySessions__none"> You have no previous sessions </div>;
    if (props.sessions.length > 0) {
        let sessionsArray = [...props.sessions].reverse()
        sessions = sessionsArray.map((session) => {
            return (<MySessionSticky  {...session} />)
        })
    }
    return (
        <div className="MySessions">
            <PaperBackground>
                    <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={1000}>
                        <div>
                            <button className="Home-button" onClick={() => props.history.push("/")}> Go Back </button>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={startAnim} classNames="fadeDown" mountOnEnter timeout={0}>
                        <div key="heading" className="MySessions__heading u-grid-column-2-3 u-justify-self-center"> My Sessions</div>
                    </CSSTransition>
                    <CSSTransition in={startAnim} classNames="fade" mountOnEnter timeout={1000}>
                        <div className="MySessionSticky__box">
                            {sessions}
                        </div>
                    </CSSTransition>
            </PaperBackground>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        sessions: state.mySessions.sessions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initSessions: (userId) => dispatch(actions.retrieveSessions(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySessions)