import * as actionTypes from "./actionTypes";
import axios from "axios";
import instance from "../../axios/axios";

import {setAuthFlashMessage} from "./authFlashMessages"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
} 

export const authSuccess= (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
 }
}


export const authFail= (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const setUserName = (name) => {
    return {
        type: actionTypes.SET_USER_NAME,
        name: name
    }
}


export const keepLoggedIn = () => {
    return dispatch => {
        const authData = {
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refreshToken")
        }
        axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_CODE}`, authData)
            .then(response => {
                localStorage.setItem("token", response.data.id_token);
                localStorage.setItem("userId", response.data.user_id);
                localStorage.setItem("refreshToken", response.data.refresh_token);
                localStorage.setItem("expirationDate", new Date(new Date().getTime() + response.data.expires_in * 1000 ));
                dispatch(authSuccess(
                    response.data.id_token, 
                    response.data.user_id, 
                ));
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(token){
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            if(expirationDate < new Date()) {
                dispatch(keepLoggedIn());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
            }
        }
    }
}

export const initUserData = (userId, firstName, lastName) => {
    const userData = {
            name: `${firstName} ${lastName[0]}.`,
            todaysSession: {
                location: "",
                sessionStartTime: "",
                sessionStarted: false
            },
        }
    instance.patch(`/${userId}.json`, userData)
        .then(response => {
        })
        .catch(error => {
            console.log(error);
        })
}

export const auth = (email, password, method, firstName = "", lastName = "") => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }


        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_CODE}`;
        if(!method){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_CODE}`;
        }
        
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("expirationDate", new Date(new Date().getTime() + response.data.expiresIn * 1000 ));
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                if(method){
                    dispatch(initUserData(response.data.localId, firstName, lastName));
                }
            })
            .catch(err => {
                console.log(err.message);
                if(method){
                    dispatch(setAuthFlashMessage(true, "The Email You Entered is Already Taken"))
                } else {
                    dispatch(setAuthFlashMessage(true, "The Email or Password You Entered Is Incorrect"))
                }   
            })

    }
}

