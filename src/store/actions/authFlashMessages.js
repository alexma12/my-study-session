import * as actionTypes from "./actionTypes"

export const setAuthFlashMessage = (isError, flashMessage) => {
    return {
        type: actionTypes.SET_AUTH_FLASH_MESSAGE,
        isError: isError,
        flashMessage: flashMessage,
    }
}


export const removeAuthFlashMessage = () => {
    return {
        type: actionTypes.REMOVE_AUTH_FLASH_MESSAGE
    }
}



