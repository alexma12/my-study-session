import React from "react"

const highlightButton = (props) => {

    let highlightButtonClasses = null;

    if(props.enabled){
        highlightButtonClasses = "HighlightButton HighlightButton__enabled"
    } else {
        highlightButtonClasses = "HighlightButton HighlightButton__disabled"
    }

    return(
    <button style = {props.style} onClick = {props.clicked} className = {highlightButtonClasses}>
        {props.children}
    </button>
    )
}


export default highlightButton;