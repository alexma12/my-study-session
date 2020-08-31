import React, { useState, useEffect } from "react";
import PaperBackground from "../backgrounds/PaperBackground/PaperBackground"
import AuthSticky from "../AuthSticky/AuthSticky";
import {connect} from "react-redux"

import * as actions from "../../store/actions"
import FlashMessage from "../FlashMessage/FlashMessage"
import { CSSTransition } from "react-transition-group";

const Auth = (props) => {

    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartAnim(true);
        }, 1200)

        return () => {
            props.onCloseFlashMessage()
        }
    }, []);

    return (
        <div className="Auth">
            <PaperBackground style={{ height: "120%" }}>
                <CSSTransition in={props.showMessage} classNames="fade" mountOnEnter timeout={1000}>
                    <FlashMessage key="flashMessage"
                        clicked={props.onCloseFlashMessage}
                        isError={props.isError}
                        message={props.flashMessage}
                    />
                </CSSTransition>
                <CSSTransition in={startAnim} classNames="fadeDown" mountOnEnter timeout={0}>
                    <div className="heading-1 u-grid-column-2-3 u-justify-self-center u-margin-top-small">Study Session</div>
                </CSSTransition>
                <AuthSticky startAnimation={startAnim} />
            </PaperBackground>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        showMessage: state.authFlash.showMessage,
        isError: state.authFlash.isError,
        flashMessage: state.authFlash.flashMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseFlashMessage: () => dispatch(actions.removeAuthFlashMessage())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);