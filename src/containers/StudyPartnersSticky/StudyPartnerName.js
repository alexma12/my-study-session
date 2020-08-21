import React from "react";

import {ReactComponent as DeleteIcon} from "../../imgs/svg/cross.svg"

const studyPartnerName = (props) => {
    return(
        <div className ="StudyPartnerName">
            {props.name}
            <DeleteIcon className = "StudyPartnerName__icon" onClick = {props.clicked}/>
        </div>
    )
}

export default studyPartnerName;