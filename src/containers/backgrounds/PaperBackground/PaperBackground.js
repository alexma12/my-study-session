import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";

const PaperBackground = (props) => {

    const [startAnim, setStartAnim] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setStartAnim(true)
        }, 400)
    })
    return(
        <div className = "PaperBackground">   
            <div  key = "lol" className = "PaperBackground__lines">
            <div className = "PaperBackground__text"> 
            {props.children}
            </div>
            </div>
            <div className = "PaperBackground__holes PaperBackground__holes--hole-top"></div>
            <div className = "PaperBackground__holes PaperBackground__holes--hole-middle"></div>
            <div className = "PaperBackground__holes PaperBackground__holes--hole-bottom"></div>
        </div>
    )
}

export default React.memo(PaperBackground);