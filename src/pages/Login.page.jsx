
import React, { useState } from "react";
// import BaseHoc from "../hoc/BaseHoc";
// import { useParams, useLocation } from 'react-router-dom';
import bgimageblue from '../images/bg-login-mobile.jpg'
import bgsignin from '../images/bg-login-sign-in.jpg'
// '../images/bgloginmobile.jpg';


//http://localhost:3000/login?authToken=evaerp282915&companyId=1234567890
const Login = () => {
    const [formData, setformData] = useState({
        email: "",
        otp: ""
    });

    const handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        // alert(value);
        setformData({
            ...formData, [name]: value
        })
    }
    // let { id } = useParams();
    // const { search } = useLocation();
    // const parameters = new URLSearchParams(search);
    // const token = parameters.get('authToken');
    // const name = parameters.get('companyId');
    // <h3>token: {token}</h3>
    // <h3>copanyID: {name}</h3>
    //  <div class="bg-[url({'./bg-login-mobile.jpg')}]">
    return (
        <div class="flex sm:flex-row flex-col relative h-screen" >
            <div class="block md:hidden h-50% sm:hidden md:h-25% sm:h-50%" style={{ background: `url(${bgimageblue})` }}>
                <div class="">
                    <div class=""><img class="" src="img/logo-white.svg" width="48" alt="Logo" /></div>
                    <div class="">Welcome to our CRM</div>
                    <div class="">Enter your details to proceed further</div>
                </div>
            </div >
            <div class="flex flex-row justify-evenly align-center w-full h-full bg-gradient-to-t md:h-75% sm:h-50%" style={{ background: `url(${bgimageblue})` }}>
                <div class="h-50% bg-white rounded-r-lg   w-full sm:h-full sm:w-6/12" >
                    <div class="w-full ml-auto mr-0 mt-auto mb-auto px-10 py-10 sm:py-60 sm:px-100 sm:max-w-[60%]">
                        <p class="text-4xl">Welcome to our CRM.</p>
                        <p class="text-4xl">Sign In to see latest updates.</p>
                        <p class="text-xl text-[#A9A9A9]">Enter your details to proceed further</p>
                        <form>
                            <div class="mt-5">
                                <label for="email">Email</label><br />
                                <input placeholder="start typing..." type="email" name="email" id="email" onChange={handleChange} /><br /><br />
                                <label for="otp">OTP</label><br />
                                <input placeholder="start typing..." type="password" name="otp" id="otp" onChange={handleChange} /><br />
                                <button class="bg-blue-500 rounded-lg w-2/4 h-12 mt-8">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="hidden h-full text-white w-6/12 md:block">
                    <div style={{ background: `url(${bgsignin})` }} class="h-full  w-full !bg-cover !bg-center !bg-no-repeat important " >
                        <div>email: {formData.email}</div>
                        <div>otp: {formData.otp}</div>
                    </div>
                </div>
            </div>

        </div >
    )
}

// function showEmailInput() {
//     const number = document.querySelector(".get_app_input_number");

//     const email = document.querySelector(".get_app_input .email");


//     const show = document.createAttribute("style");
//     show.value = "display:flex;";
//     email.setAttributeNode(show);

//     const hide = document.createAttribute("style");
//     hide.value = "display:none;";
//     number.setAttributeNode(hide);

// }

// function showNumberInput() {
//     const number = document.querySelector(".get_app_input_number");
//     const email = document.querySelector(".get_app_input .email");

//     const show = document.createAttribute("style");
//     show.value = "display:flex;";
//     number.setAttributeNode(show);

//     const hide = document.createAttribute("style");
//     hide.value = "display:none;";
//     email.setAttributeNode(hide);

// }

export default Login;