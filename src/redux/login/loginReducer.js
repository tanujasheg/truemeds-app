import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    VERIFY_OTP,
    FAILED_OTP,
    SUCCESS_OTP,
    FETCH_SUCCESS,
    FETCH_FAILED,
    LOGOUT,
    START_COUNTER,
    END_COUNTER,
} from './loginTypes'


const initialState = {
    loading: false,
    success: false,
    error: false,
    mobileNo: '',
    otp: "",
    otpVerificationStatus: false,
    authHeaders: undefined,
    products:[],
    fetchStatus:false,
    counterStart:false,
    viewProducts:false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                mobileNo: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                otpVerificationStatus:false,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: false,
                otpVerificationStatus:false
            }
        case VERIFY_OTP:
            return {
                ...state,
                otpVerificationStatus: false,
                authHeaders:undefined,
                otp: action.payload,
                
            }
        case SUCCESS_OTP:
            return {
                ...state,
                otpVerificationStatus: true,
                authHeaders: action.payload,
                otp:"",
                counterStart:true,
                success: false,
                counter:true,
            }
        case FAILED_OTP:
            return {
                ...state,
                otpVerificationStatus: false,
                authHeaders: undefined,
                counterStart:false,
                otp: "",
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                counterStart:false,
                products:action.payload,
                fetchStatus : true,
                viewProducts:true
            }
        case FETCH_FAILED:
            return{
                ...state,
                counterStart:false,
                products:[],
                fetchStatus : false,
            }
        case START_COUNTER:
            return{
                ...state,
                otpVerificationStatus:true,
                counterStart:true,
            }
        case END_COUNTER:
                return{
                    ...state,
                    otpVerificationStatus:false,
                    counterStart:false,
                    viewProducts:true
                }
        case LOGOUT:
            return {
                ...state,
                counterStart:false,
                otpVerificationStatus: false,
                authHeaders: undefined,
                success:false,
                viewProducts:false,
            }

        default: return state
    }
}

export default reducer

