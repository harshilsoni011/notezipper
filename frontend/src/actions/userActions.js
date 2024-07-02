import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        axios.post('/users/login', { email, password }, config).then((res) => {
            if (!res?.data?.data?.token) {
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: res?.error
                })
            }

            document.cookie = "token=" + res.data?.data?.token
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res?.data?.data })
        }).catch((error) => {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error?.response?.data?.message
            })
        });

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        console.log("Error From Catch Block =>> ", error);
    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        console.log("🚀 ~ file: userActions.js:44 ~ updateProfile ~ user:", user)

    } catch (error) {
        console.log("🚀 ~ file: userActions.js:47 ~ updateProfile ~ error:", error)

    }
};