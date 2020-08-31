import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as PortraitIcon } from "../../imgs/svg/portrait.svg";

import InputSticky from "../InputSticky/InputSticky"

const AuthSticky = (props) => {

    const [allowLogin, setAllowLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [inputs, setInputs] = useState({
        firstName: {
            name: "firstName",
            elementConfig: {
                type: "text",
                placeholder: "First Name"
            },
            value: "",
            validation: {
                required: true,
            },
            touched: false,
            valid: false,

        },
        lastName: {
            name: "lastName",
            elementConfig: {
                type: "text",
                placeholder: "Last Name"
            },
            value: "",
            validation: {
                required: true,
            },
            touched: false,
            valid: false
        },
        email: {
            name: "email",
            elementConfig: {
                type: "email",
                placeholder: "Email Address"
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            touched: false,
            valid: false
        },
        password: {
            name: "password",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            value: "",
            validation: {
                required: true,
                length: 6
            },
            touched: false,
            valid: false
        }
    });

    const checkValidity = (value, rules) => {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (rules.length) {
            isValid = value.length >= rules.length && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }


    const changedHandler = (event) => {
        const updatedInputs = { ...inputs };
        const updatedInput = updatedInputs[event.target.id];
        updatedInput.touched = true;
        updatedInput.valid = checkValidity(event.target.value, updatedInput.validation)
        updatedInput.value = event.target.value;
        updatedInputs[event.target.id] = updatedInput;
        setInputs(updatedInputs);

        let allowLoginBool = true;
        for (let input in inputs) {
            if (!inputs[input].valid) {
                allowLoginBool = false;
            }
        }

        if (allowLogin === !allowLoginBool) {
            setAllowLogin(allowLoginBool)
        }

    }

    const authSubmitHandler = (event) => {
        event.preventDefault();
        if (isSignUp) {
            if (allowLogin) {
                props.onSignUp(inputs["email"].value, inputs["password"].value, inputs["firstName"].value.trim(), inputs["lastName"].value.trim());
            }
        } else {
            props.onLogIn(inputs["email"].value, inputs["password"].value);
        }
    }

    const authSwitchHandler = () => {
        setIsSignUp(!isSignUp);
    }


    const inputsArray = [];
    for (let input in inputs) {
        inputsArray.push({
            id: input,
            config: inputs[input]
        })
    }

    const formInputs = inputsArray.map(input => {
        return (<InputSticky
            key={input.id}
            name={input.config.name}
            elementConfig={input.config.elementConfig}
            inValid={!input.config.valid}
            touched={input.config.touched}
            value={input.config.value}
            changed={changedHandler}
            isSignUp={isSignUp}
        />
        );
    })


    return (
        <CSSTransition in={props.startAnimation} mountOnEnter timeout={0}>
            <div className="AuthSticky">
                <div className="heading-2 u-justify-self-center u-margin-top-sm ">
                    <div className="AuthSticky__text-box">
                        {!isSignUp ? "Log In" : "Sign Up"}
                    </div>
                    <div className="AuthSticky__portrait-icon-box">
                        <PortraitIcon className="AuthSticky__portrait-icon" />
                    </div>
                </div>
                <form className="AuthSticky__authForm" onSubmit={authSubmitHandler}>
                    {formInputs}
                    <div className="buttonSticky__box">
                        <button className={(allowLogin || !isSignUp) ? "buttonSticky" : "buttonSticky--disabled"}>
                            {!isSignUp ? "Log In" : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="AuthSticky__Auth-Switch">
                    <span> {!isSignUp ? "Don't have an account yet?" : "Have an account already?"}
                        <span onClick={authSwitchHandler} className="AuthSticky__Auth-Switch--sign-up"> {!isSignUp ? "Sign Up" : "Log In"} </span>
                    </span>
                </div>
            </div>
        </CSSTransition>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (email, password) => dispatch(actions.auth(email, password, false)),
        onSignUp: (email, password, firstName, lastName) => dispatch(actions.auth(email, password, true, firstName, lastName)),

    }
}

export default withRouter(connect(null, mapDispatchToProps)(AuthSticky));