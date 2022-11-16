
import React, { useState } from "react";
import Axios from 'axios';
// import BaseHoc from "../hoc/BaseHoc";
// import { useParams, useLocation } from 'react-router-dom';
import bgimageblue from '../images/bg-login-mobile.jpg'
import bgsignin from '../images/bg-login-sign-in.jpg'
import logo from '../images/logo-white.svg';

// '../images/bgloginmobile.jpg';


//http://localhost:3000/login?authToken=evaerp282915&companyId=1234567890
const Login = () => {
    // const [formData, setformData] = useState({
    //     email: "",
    //     mobile: "",
    //     otp: ""
    // });
    const [emailInfo, setEmailInfo] = useState("");
    const [mobileInfo, setMobileInfo] = useState("");
    const [otpInfo, setOtpInfo] = useState("");
    // const loadDefaultFormData = () => {
    //     console.log("onload");
    //     document.getElementById("mobile").hidden = true;
    //     document.getElementById("email").hidden = false;
    //     // document.getElementById("emailRadio").checked = true;
    //     // document.getElementById("mobileRadio").checked = false;
    // };

    const handleChangeEmail = event => {
        const target = event.target;
        const email = target.value;
        console.log("inside email" + email);
        setEmailInfo(email);
    }

    const handleChangeMobile = event => {
        const target = event.target;
        const mobile = target.value;
        console.log("inside mobile" + mobile);
        setMobileInfo(mobile);
    }

    const handleChangeOtp = event => {
        const target = event.target;
        const otp = target.value;
        console.log("inside otp" + otp);
        setOtpInfo(otp);
    }


    // alert(value);

    const showEmailInput = event => {
        console.log("showEmailInput");
        document.getElementById("mobile").hidden = true;
        document.getElementById("mobile").className = "hidden";
        document.getElementById("email").hidden = false;

        // document.getElementById("emailRadio").checked = true;
        // document.getElementById("mobileRadio").checked = false
    }
    const showMobilenoInput = event => {
        console.log("showMobilenoInput");
        document.getElementById("email").hidden = true;
        document.getElementById("mobile").hidden = false;
        document.getElementById("mobile").className = "inline";
        // document.getElementById("mobile").classList.add('inline', 'w-3/4');
        // document.getElementById("emailRadio").checked = true;
        // document.getElementById("mobileRadio").checked = false
    }

    const getCustomerDetails = () => {

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        // console.log("in getCustomerDetails2");
        // console.log("in getCustomerDetails3" + url);
        Axios.get(url).then(
            (response) => {
                console.log(response);
            }
        )
        // .catch((exception) => {
        //     console.log("Error is" + exception);
        // })

    }
    // let { id } = useParams();
    // const { search } = useLocation();
    // const parameters = new URLSearchParams(search);
    // const token = parameters.get('authToken');
    // const name = parameters.get('companyId');
    // <h3>token: {token}</h3>
    // <h3>copanyID: {name}</h3>
    //  <div className="bg-[url({'./bg-login-mobile.jpg')}]">
    return (
        <div className="flex sm:flex-row flex-col relative h-screen" >
            <div className="block md:hidden h-50% sm:hidden md:h-25% sm:h-50%" style={{ background: `url(${bgimageblue})` }}>
                <div className="w-full h-full flex flex-col justify-center align-center">
                    <div className="w-full flex justify-center"><img className="" align="center" src={logo} width="48" alt="Logo" /></div>
                    <div className="text-center w-full text-white text-3xl">Welcome to our CRM top</div>
                    <div className="text-center w-full text-white text-xl ">Enter your details to proceed further</div>
                </div>
            </div >
            <div className="flex flex-row justify-evenly align-center w-full h-full bg-gradient-to-t md:h-75% sm:h-50%" style={{ background: `url(${bgimageblue})` }}>
                <div className="  h-50% bg-white rounded-r-lg   w-full sm:h-full sm:w-6/12" >
                    <div className="w-full ml-auto mr-0 mt-auto mb-auto px-10 py-10 sm:py-60 sm:px-100 sm:max-w-[60%]">
                        <p className="text-4xl">Welcome to our CRM.</p>
                        <p className="text-4xl">Sign In to see latest updates.</p>
                        <p className="text-xl text-[#A9A9A9]">Enter your details to proceed further</p>
                        <form >
                            <div className="mt-5">
                                <div className="h-full w-full flex justify-start gap-10 align-center">
                                    <div>
                                        <input type="radio" value="Email" name="inputdata" id="emailRadio" defaultChecked onClick={showEmailInput} />
                                        <label htmlFor="emailRadio">Email</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="Mobile" name="inputdata" id="mobileRadio" onClick={showMobilenoInput} />
                                        <label htmlFor="mobileRadio">Mobile</label>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <input className="w-3/4 " placeholder="Enter email" type="email" name="email" id="email" onChange={handleChangeEmail} />
                                    <input className="hidden" placeholder="Enter mobile no" type="number" name="mobile" id="mobile" onChange={handleChangeMobile} />
                                </div>
                                <hr className="w-3/4 mt-1"></hr>
                                <br />
                                <label htmlFor="otp">OTP</label><br />
                                <div className="flex flex-row gap-2">
                                    <input className="mt-1" placeholder="Enter otp" type="password" name="otp" id="otp" onChange={handleChangeOtp} /><br />
                                    <button className="bg-blue-500 rounded-lg text-white p-1">Get OTP</button>
                                </div>
                                <hr className="w-3/4 mt-1"></hr>
                                <button className="bg-blue-500 rounded-lg w-2/4 h-12 mt-8 text-white" onClick={getCustomerDetails}>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden h-full text-white w-6/12 md:block">
                    <div style={{ background: `url(${bgsignin})` }} className="h-full  w-full !bg-cover !bg-center !bg-no-repeat " >
                        {/* <div>email:{emailInfo}</div>
                        <div>mobile:{mobileInfo}</div>
                        <div>otp:{otpInfo}</div> */}
                    </div>
                </div>
            </div>

        </div >
    )
}



export default Login;