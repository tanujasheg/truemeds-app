import React, { useState } from 'react';
import { verifyOtp } from "../redux";
import { connect } from "react-redux";
import store from "../redux/store";

function VerifyOtpComponent(props) {
    const [otp, setOtp] = useState("");
    const state = store.getState();

    function validate(otp) {
        if ((otp).toString().length !== 4) {
            alert("Not a valid OTP")
        } else {
            props.verifyOtp(otp, state.login.mobileNo)
            // props.startCounter(true)
        }
    }
    return (
        <div className="jumbotron container" >
            <h1 className="display-4">Hello, Welcome to Truemeds!</h1>
            <p className="lead">Enter your OTP here </p>

            <hr className="my-4" />
            {/* <form> */}
            <div className="form-group">
                <input className="form-control" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} value={otp} />

            </div>
            <button className="btn btn-primary" onClick={() => validate(otp)} >Verify OTP</button>

            <style jsx>
                {`
                .container{
                    margin-top:20px;
                    // width:500px;
                    border:1px solid grey;
                    border-radius:7px;
                    padding:10px;
                    margin-top:80px;
                }
                .btn{
                    margin:20px;
                    margin-top:30px;

                }
                .form-control{
                    width:30%;
                    margin:auto;
                }
                @media screen and (max-width: 1000px){
                   .container{
                       width:80%;
                       
                   }
                   .form-control{
                    width:50%;
                    margin:auto;
                }
                }
                
                @media screen and (max-width: 620px){
                    
                    .container{
                        width:100%;
                        padding:0px;
                        
                    }
                    .form-control{
                        width:80%;
                        margin:auto;
                    }
                }
                `}
            </style>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        otp: state.login.otp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyOtp: (otp,number) => dispatch(verifyOtp(otp,number))
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtpComponent)
