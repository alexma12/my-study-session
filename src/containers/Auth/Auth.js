import React, {useState, useEffect} from "react";
import PaperBackground from "../backgrounds/PaperBackground/PaperBackground"
import AuthSticky from "../AuthSticky/AuthSticky";

import {CSSTransition} from "react-transition-group";

const Auth = () => {

    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartAnim(true);
        }, 1200)
    }, []);

    return (
        <div className = "Auth">
            <PaperBackground>
                <CSSTransition in = {startAnim} classNames = "fadeDown" mountOnEnter timeout ={0}>
                <div className = "heading-1 u-grid-column-2-3 u-justify-self-center u-margin-top-small">Study Session</div>
                </CSSTransition>  
                <AuthSticky startAnimation = {startAnim}/>
            </PaperBackground>
        </div>
    )
}


export default Auth;