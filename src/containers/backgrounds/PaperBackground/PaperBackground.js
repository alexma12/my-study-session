import React from "react";


const paperBackground = (props) => {

    return(
        <div className = "PaperBackground">
            <div className = "PaperBackground__lines">
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

export default React.memo(paperBackground);