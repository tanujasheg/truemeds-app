import React, { useState} from 'react';
import { loginUsers } from "../redux"
import { connect } from "react-redux"
import store from "../redux/store";
import  VerifyOtpComponent from "./verifyotp";
import ProductList from "./productList";
import Counter from "./counter"



function Home(props) {
    const [number, setmobile] = useState("");
    const state = store.getState();
   
    
    console.log("props",props)
    function validate(number){
        if((number).toString().length  !== 10){
            alert("Not a valid Mobile No")
        }else{
            props.loginUsers(number)
        }
        }
    
    return (
        <div>
             {(!props.success && !props.otpVerificationStatus&&!props.viewProducts)&&<div className="jumbotron container">
                <h1 className="display-4">Hello, Welcome to Truemeds!</h1>
                <p className="lead">Enter your Mobile No to Login {props.authHeaders} </p>

               
                
                    <div className="form-group">
                        <input  className="form-control" placeholder="Enter Mobile No" onChange={(e) => setmobile(e.target.value)} value={number} />

                    </div>
                    <button className="btn btn-primary" onClick={() => validate(number)} >Submit</button>

               
               
            </div>}
             {(props.success &&!props.viewProducts)&&
                <VerifyOtpComponent/>
                
            } 
            {props.viewProducts&&
            <ProductList/>
             } 
             {props.counterStart&&<Counter/>}
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
                    //    margin-left:5%;
                    //    margin-right:5%;
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
                        // margin-left:5%;
                        // margin-right:5%;
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
        mobileNo: state.login.mobileNo,
        success : state.login.success,
        otpVerificationStatus:state.login.otpVerificationStatus,
        counterStart:state.login.counterStart,
        viewProducts:state.login.viewProducts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUsers: (number) => dispatch(loginUsers(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
