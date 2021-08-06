import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    VERIFY_OTP,
    FAILED_OTP,
    SUCCESS_OTP,
    LOGOUT,
    FETCH_SUCCESS,
    FETCH_FAILED,
    START_COUNTER,
    END_COUNTER
} from './loginTypes'

export const loginUsersRequest = (number = "") => {
    return {
        type: LOGIN_REQUEST,
        payload: number
    }
}

export const loginUsersSuccess = success => {
    return {
        type: LOGIN_SUCCESS,
        payload: success
    }
}

export const loginUsersFailure = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const otpAction = (otp = "") => {
    return {
        type: VERIFY_OTP,
        payload: otp
    }
}
export const otpFailure = (otp = "") => {
    return {
        type: FAILED_OTP,
        payload: otp
    }
}
export const otpSuccess = (otp = "") => {
    return {
        type: SUCCESS_OTP,
        payload: otp
    }
}
export const logout = (value) => {
    return {
        type: LOGOUT,
        payload: value
    }
}
export const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        payload: data
    }
}
export const fetchFailed = (value) => {
    return {
        type: FETCH_FAILED,
        payload: value
    }
}

export const startCounter = (value) => {
    return {
        type: START_COUNTER,
        payload: value
    }
}
export const endCounter = (value) => {
    return {
        type: END_COUNTER,
        payload: value
    }
}

export const verifyOtp = (otp, number) => {
    return (dispatch) => {
        dispatch(otpAction(otp));
        // dispatch(otpSuccess(true));
        // dispatch(startCounter(true));

         // axios.post(`https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${number}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`, {

            //   }, {
            //     headers: {
            //         transactionId: "react_interview"
            //     },
            //   })

        fetch(`https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${number}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`, {
            method: 'POST',
            headers: {
                transactionId: "react_interview"
            },
        })           
            .then((res) => {
                console.log("response :- ", res.status);
                // dispatch(loginUsersSuccess(true));
                if (res.status === 200) {
                    res.json().then(data => {
                        console.log(data.Response);
                        dispatch(otpSuccess(data.Response))
                        dispatch(startCounter(true));
                    });
                } else {
                    console.log(res.status);
                    dispatch(otpFailure(true))
                }
            }).catch((error) => {
                console.log("Api call error ", error.message);
                console(error.message);
                dispatch(otpFailure(true))
            });
    }
}

export const loginUsers = (number) => {
    return (dispatch) => {
        dispatch(loginUsersRequest(number))
        // axios.post(`https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${number}`, {

        //   }, {
        //     headers: {
        //         transactionId: "react_interview"
        //     },
        //   })
        fetch(`https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${number}`, {
            method: 'POST',

            headers: {
                transactionId: "react_interview"
            },
        })
            .then((res) => {
                console.log("response :- ", res.status);
                // dispatch(loginUsersSuccess(true));
                if (res.status === 200) {
                    dispatch(loginUsersSuccess(true));
                } else {
                    console.log(res.status);
                    dispatch(loginUsersFailure(false));
                    alert(`Error`)
                }
            }).catch((error) => {
                console.log("Api call error ", error.message);
                alert(error.message);
                dispatch(loginUsersFailure(false))
            });
    }
}

export const fetchProducts = (token) => {
    return (dispatch) => {

        // axios.post(`https://stage-services.truemeds.in/ArticleService/getArticleListing`, {
        //   }, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     },
        //   })

        fetch(`https://stage-services.truemeds.in/ArticleService/getArticleListing`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                console.log("response :- ", res.status);
                // dispatch(loginUsersSuccess(true));
                if (res.status === 200) {
                    res.json().then(data => {
                        console.log("Data :", data);
                        dispatch(fetchSuccess(data.result))
                    });
                } else {
                    alert("Error")
                    console.log("res :", res.status);
                    dispatch(fetchFailed(true))
                }
            }).catch((error) => {
                alert("Error")
                console.log("error :", error.message);
                dispatch(fetchFailed(true))
            });
    }
}


