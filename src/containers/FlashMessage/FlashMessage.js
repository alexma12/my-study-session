import React, { forwardRef } from "react";

const flashMessage = forwardRef((props) => {

    let classNames = "FlashMessage FlashMessage__success";
    if (props.isError) {
        classNames = "FlashMessage FlashMessage__fail";
    }

    return (
        <div className={classNames}>
            {props.message}
            <span className = "FlashMessage__subMessage" >
                {props.subMessage ? props.subMessage : null}
            </span>
            <span className="FlashMessage__button" onClick={props.clicked} > X </span>
        </div>

    )
})


export default flashMessage;