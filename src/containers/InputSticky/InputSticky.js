import React from "react";
import {ReactComponent as KeyIcon} from "../../imgs/svg/key.svg";
import {ReactComponent as MailIcon} from "../../imgs/svg/mail.svg";
const InputSticky = (props) => {

    let icon = <MailIcon className = "InputSticky__icon" />
    if(props.elementConfig.type === "password"){
        icon = <KeyIcon className = "InputSticky__icon" />
    }
    return(
        <div className = "InputStickyNote">
            {icon}
        <input value = {props.value} id = {props.name} {...props.elementConfig} onChange = {props.changed} className = "InputSticky" />
        </div>
    )
}

export default InputSticky