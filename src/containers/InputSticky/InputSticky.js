import React from "react";
import { ReactComponent as KeyIcon } from "../../imgs/svg/key.svg";
import { ReactComponent as MailIcon } from "../../imgs/svg/mail.svg";
const InputSticky = (props) => {

    let icon = <MailIcon className="InputSticky__icon" />
    if (props.elementConfig.type === "password") {
        icon = <KeyIcon className="InputSticky__icon" />
    }

    let authInput = null;


    switch (props.name) {
        case ("password"):
            authInput =
                <div className="InputStickyNote">
                    {icon}
                    <input
                        value={props.value}
                        id={props.name}
                        {...props.elementConfig}
                        onChange={props.changed}
                        className={(props.isSignUp && props.inValid && props.touched)? "InputSticky InputSticky--invalid" : "InputSticky"}
                    />
                </div>
            break;
        case ("email"):
            authInput =
                <div className="InputStickyNote">
                    {icon}
                    <input
                        value={props.value}
                        id={props.name}
                        {...props.elementConfig}
                        onChange={props.changed}
                        className={(props.isSignUp && props.inValid && props.touched) ? "InputSticky InputSticky--invalid" : "InputSticky"}
                    />
                </div>
            break;

        case ("firstName"):
            authInput =
                <span className="InputStickyNote--firstName">
                    <input
                        value={props.value}
                        id={props.name}
                        {...props.elementConfig}
                        onChange={props.changed}
                        className={(props.inValid && props.touched) ? "InputSticky InputSticky--invalid InputSticky--firstName" : "InputSticky InputSticky--firstName"}
                    />
                </span>
            break;

        case ("lastName"):
            authInput =
                <span className="InputStickyNote--lastName">
                    <input
                        value={props.value}
                        id={props.name}
                        {...props.elementConfig}
                        onChange={props.changed}
                        className={(props.inValid && props.touched) ? "InputSticky InputSticky--invalid InputSticky--lastName" : "InputSticky InputSticky--lastName"} />
                </span>
            break;
    }

    if(!props.isSignUp && (props.name === "lastName" || props.name === "firstName")){
        authInput = null;
    }

    return (
        <span>
            {authInput}
        </span>
    )

}

export default InputSticky