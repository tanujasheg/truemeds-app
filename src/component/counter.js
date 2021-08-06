import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { connect } from "react-redux";
import { endCounter } from '../redux';




function Counter(props) {
    function MyTimer({ expiryTimestamp }) {

        const {
            seconds,
            minutes,
            hours,
            days,
            isRunning,
            start,
            pause,
            resume,
            restart,
        } = useTimer({ expiryTimestamp, onExpire: () => props.endCounter(false) });


        return (
            <div style={{ textAlign: 'center' }}>

                
                <div style={{ fontSize: '100px' }}>
                    <span>{minutes}</span>:<span>{seconds}</span>
                </div>

                
                
            </div>
        );
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60); // 1 minutes timer
    return (
        <div>
            <MyTimer expiryTimestamp={time} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        otpVerificationStatus: state.login.otpVerificationStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        endCounter: (value) => dispatch(endCounter(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)