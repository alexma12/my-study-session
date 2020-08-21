import React, { useState, } from "react";
import {CSSTransition} from "react-transition-group"

import { ReactComponent as PortraitIcon } from "../../imgs/svg/portrait.svg"

import InputSticky from "../InputSticky/InputSticky"

const AuthSticky = (props) => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [inputs, setInputs] = useState({
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

    const checkValidity = () => {
        return true
    }

    const changedHandler = (event) => {
        const updatedInputs = {...inputs};
        const updatedInput = updatedInputs[event.target.id];
        updatedInput.touched = true;
        updatedInput.valid = checkValidity(updatedInput.value, updatedInput.validation)
        updatedInput.value = event.target.value;
        updatedInputs[event.target.id] = updatedInput;
        setInputs(updatedInputs);
    }
    
    const authSubmitHandler = (event) => {
        event.preventDefault();
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
            name = {input.config.name}
            elementConfig={input.config.elementConfig}
            inValid={!input.config.valid}
            touched={input.config.touched}
            value={input.config.value}
            changed={changedHandler}
        />
        );
    })

    return (
        <CSSTransition in = {props.startAnimation} mountOnEnter timeout ={0}>
        <div className="AuthSticky">
            <div className="heading-2 u-justify-self-center u-margin-top-sm ">
                <div className="AuthSticky__text-box">
                    {!isSignUp ? "Log In" : "Sign Up"}
                </div>
                <div className="AuthSticky__portrait-icon-box">
                    <PortraitIcon className="AuthSticky__portrait-icon" />
                </div>
            </div>
            <form onSubmit = {authSubmitHandler}>
            {formInputs}
            <div className = "buttonSticky__box">
            <button className="buttonSticky">
                {!isSignUp ? "Log In" : "Sign Up"}
            </button>
            </div>
            </form>

            <div className = "AuthSticky__Auth-Switch">
               <span> {!isSignUp ? "Don't have an account yet?" : "Have an account already?"}  
               <span onClick = {authSwitchHandler} className = "AuthSticky__Auth-Switch--sign-up"> {!isSignUp? "Sign Up" : "Log In"} </span> 
               </span>
            </div>
        </div>
        </CSSTransition>
    )
}

export default AuthSticky