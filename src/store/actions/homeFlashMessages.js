import * as actionTypes from "./actionTypes"

export const setFlashMessage = (isError, flashMessage, subMessage = "") => {
    return {
        type: actionTypes.SET_HOME_FLASH_MESSAGE,
        isError: isError,
        flashMessage: flashMessage,
        subMessage: subMessage
    }
}


export const removeFlashMessage = () => {
    return {
        type: actionTypes.REMOVE_HOME_FLASH_MESSAGE
    }
}



