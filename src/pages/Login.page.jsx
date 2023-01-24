
import React, { useState, useEffect } from "react";
import Axios from 'axios';
// import BaseHoc from "../hoc/BaseHoc";
import { useLocation } from 'react-router-dom';
//imported images 
import bgimageblue from '../images/bg-login-mobile.jpg'
import bgsignin from '../images/bg-login-sign-in.jpg'
import logo from '../images/logo-white.svg';
import evalogo from '../images/evalogo.png';


// window.addEventListener("popstate", e => {  // Nope, go back to your page
//     this.props.history.go(1);
// });

//http://localhost:3000/login?authToken=my-dot-evaerp282915&companyName=Pecopp Pest Control
// ashwini.patil@evasoftwaresolutions.com
const Login = () => {

    const [emailInfo, setEmailInfo] = useState("");
    const [mobileInfo, setMobileInfo] = useState("");
    const [otpInfo, setOtpInfo] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [choice, setChoice] = useState("Mobile");
    const [appid, setAppId] = useState("");//my-dot-evadev0006
    const { search } = useLocation();


    useEffect(() => {
        console.log("in useEffect");
        setCompanyDetails();
    }, []);

    const setCompanyDetails = () => {
        console.log("in setCompanyDetails");
        const parameters = new URLSearchParams(search);
        const receivedAppId = parameters.get('authToken');
        if (receivedAppId != null) {
            console.log("in receivedAppId");
            // setAppId(receivedAppId);

            let url = "https://" + receivedAppId + ".appspot.com/slick_erp/getimage?width=100&height=1024";
            Axios.get(url).then(
                (response) => {
                    console.log("status=" + response.status)
                    console.log("status=" + response.statusText)
                    if (response.status === 404) {
                        alert("Invalid link!");
                    } else {
                        setAppId(receivedAppId);
                        localStorage.setItem("appId", receivedAppId);
                        console.log("receivedAppId " + receivedAppId + "is set as appid");
                    }
                }
            ).catch((exception) => {
                console.log("Error is" + exception);
                alert("Invalid link!");
                return;
            })

        } else {
            alert("Invalid link!");
            return;
            // localStorage.setItem("appId", "my-dot-evadev0006");
            // console.log("appid set to my-dot-evadev0006");
        }

    }


    const handleChangeEmail = event => {
        document.getElementById("mobile").value = "";
        setMobileInfo("");
        const target = event.target;
        const email = target.value;
        // console.log("inside email" + email);
        setEmailInfo(email);
    }

    const handleChangeMobile = event => {
        document.getElementById("email").value = "";
        setEmailInfo("");
        const target = event.target;
        const mobile = target.value;
        // console.log("inside handleChangeMobile" + mobile);
        if (isNaN(mobile)) {
            alert("Enter numbers only")
            target.value = "";

        } else {
            setMobileInfo(mobile);
        }
    }

    const handleChangeOtp = event => {
        const target = event.target;
        const otp = target.value;
        // console.log("inside otp" + otp);
        setOtpInfo(otp + "");
    }

    const showEmailInput = event => {
        console.log("showEmailInput emailinfo" + emailInfo);
        document.getElementById("mobile").value = "";
        document.getElementById("mobile").hidden = true;
        document.getElementById("mobile").className = "hidden";
        document.getElementById("email").hidden = false;
        document.getElementById("email").className = "inline";
        setChoice("Email");
    }
    const showMobilenoInput = event => {
        console.log("showMobilenoInput");
        document.getElementById("email").value = "";
        document.getElementById("email").hidden = true;
        document.getElementById("email").className = "hidden";
        document.getElementById("mobile").hidden = false;
        document.getElementById("mobile").className = "inline";
        setChoice("Mobile");
    }

    const getOTP = (event) => {
        event.preventDefault();

        console.log("search=" + search);
        const parameters = new URLSearchParams(search);
        const receivedAppId = parameters.get('authToken');
        // let appid = "";
        if (receivedAppId != null) {
            // setAppId(receivedAppId);
            if (appid != null && appid !== "") {
                // localStorage.setItem("appId", receivedAppId);
                // appid = receivedAppId;
                console.log("receivedAppId " + receivedAppId + "is set as appid");
            } else {
                alert("Invalid link");
                return;
            }
        } else {
            alert("Invalid link");
            return;
            // localStorage.setItem("appId", "my-dot-evadev0006");
            // appid = "my-dot-evadev0006";
            // console.log("appid set to my-dot-evadev0006");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOtp(otp + "");
        console.log("OTP is" + otp);
        console.log("mobileinfo=" + mobileInfo);
        console.log("emailinfo=" + emailInfo);
        if (mobileInfo === "" && emailInfo === "") {
            alert("Enter email or mobile number!");
            return;
        }
        if (choice === "Email") {
            if (!validEmail.test(emailInfo)) {
                alert("Invalid email");
                return;
            }
        }
        if (choice === "Mobile") {
            if (!validMobileNo.test(mobileInfo)) {
                alert("Invalid mobile number");
                return;
            }
        }
        let url = "";
        console.log("choice=" + choice);
        if (choice === "Email") {
            url = "https://" + appid + ".appspot.com/slick_erp/getuserRegistrationOtp?mobileNo=" + "" + "&emailId=" + emailInfo + "&applicationName=CustomerPortal&OTP=" + otp;
        }
        if (choice === "Mobile") {
            url = "https://" + appid + ".appspot.com/slick_erp/getuserRegistrationOtp?mobileNo=" + mobileInfo + "&emailId=" + "" + "&applicationName=CustomerPortal&OTP=" + otp;
        }
        console.log(url);
        if (url != "") {
            Axios.get(url).then(
                (response) => {
                    console.log(response.data);
                    alert(response.data + otp);
                }
            ).catch((exception) => {
                console.log("Error is" + exception);
            })
        }
        // Email id not registered, contact your system administrator.
    }

    const getCustomerDetails = (event) => {
        event.preventDefault();

        if (appid != null && appid !== "") {
            if (mobileInfo === "" && emailInfo === "") {
                alert("Enter email or mobile number!!");
                return;
            }
            if (choice === "Email") {
                if (!validEmail.test(emailInfo)) {
                    alert("Invalid email");
                    return;
                }
            }
            if (choice === "Mobile") {
                if (!validMobileNo.test(mobileInfo)) {
                    alert("Invalid mobile number");
                    return;
                }
            }
            if (generatedOtp === "") {
                alert("Click on 'get OTP' button to receive OTP");
                return;
            }

            if (otpInfo === "") {
                alert("Enter OTP");
                return;
            }
            console.log("generated otp=" + generatedOtp);
            console.log("entered otp=" + otpInfo);
            if (otpInfo === generatedOtp) {
                console.log("OTP is valid");

            }
            else {
                alert("Invalid OTP!");
                return;
            }
            console.log("choice=" + choice);
            let appid = localStorage.getItem("appId");
            let url = "";
            if (choice === "Email") {
                url = "https://" + appid + ".appspot.com/slick_erp/customerDetails?customerCellNo=" + "" + "&customerEmail=" + emailInfo + "&applicationName=CustomerPortal";
            }
            if (choice === "Mobile") {
                url = "https://" + appid + ".appspot.com/slick_erp/customerDetails?customerCellNo=" + mobileInfo + "&customerEmail=" + "" + "&applicationName=CustomerPortal";
            }
            console.log(url);

            if (url != "") {
                Axios
                    .get(url)
                    .then((response) => response.data)
                    .then((json) => {
                        console.log('json', json);
                        // alert("Response= " + json);


                        localStorage.setItem("customerId", json.customerId);
                        localStorage.setItem("customerName", json.customerName);
                        localStorage.setItem("customerAddress", json.address);
                        if (json.customerEmail === "")
                            localStorage.setItem("customerEmail", "\"\"");
                        else
                            localStorage.setItem("customerEmail", json.customerEmail);
                        localStorage.setItem("customerCell", json.customerCellNo);
                        localStorage.setItem("appId", appid);
                        localStorage.setItem("companyBranch", json.branch);
                        localStorage.setItem("companyId", json.companyId);


                        loadCustomerBranches();
                        // window.location.href = `/services`;
                    })
                    .catch((error) => {
                        console.log(error);
                    });



            }
        } else {
            alert("Invalid link");
            return;
        }
    }

    const loadCustomerBranches = () => {
        console.log("loading customer branches");
        let companyId = localStorage.getItem("companyId");
        let custBranchUrl = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/fetchServiceLocation?authCode=" + companyId + "&customerId=" + localStorage.getItem("customerId") + "&action=Fetch customer branch";
        console.log("custBranchUrl=" + custBranchUrl);
        Axios
            .get(custBranchUrl)
            .then((response) => response.data)
            .then((json) => {
                const customerBranchdata = json;
                var brancharr = ["--select--", "Main Branch"]
                if ('Failed' in customerBranchdata) {
                    console.log(customerBranchdata.Failed);
                } else {
                    customerBranchdata.map(branch => {
                        brancharr.push(branch.customerBranchName);
                    })
                }
                console.log("brancharr size=" + brancharr.length);
                localStorage.setItem("customerBranchList", brancharr);
                console.log("customerBranchList=" + localStorage.getItem("customerBranchList"));
                window.location.href = `/services`;
            })
            .catch((error) => {
                console.log("customer branches set to null" + error);
            });


    }
    return (
        <div className="flex sm:flex-row flex-col relative h-screen" >
            <div className="block h-50% sm:hidden" style={{ background: `url(${bgimageblue})` }}>
                <div className="w-full h-full flex flex-col justify-center align-center ">
                    <div className="w-full flex justify-center my-4">
                        {/* <img className="" align="center" src={logo} width="48" alt="Logo" /> */}
                        <img src={"https://" + appid + ".appspot.com/slick_erp/getimage?width=100&height=1024"} alt="company logo" className="w-50 sm:w-100" />
                    </div>
                </div>
            </div >
            <div className="flex flex-row justify-evenly align-center w-full h-screen bg-gradient-to-t sm:h-50%" style={{ background: `url(${bgimageblue})` }}>
                <div className="h-50% bg-white rounded-t-lg sm:rounded-none sm:rounded-r-lg w-full sm:h-full sm:w-6/12 " >
                    <div className="w-full h-full ml-auto mr-0 px-10 py-10 sm:py-48 sm:px-100 sm:max-w-[70%] relative ">
                        <p className="hidden sm:flex sm:justify-center">
                            <img src={"https://" + appid + ".appspot.com/slick_erp/getimage?width=100&height=1024"} alt="company logo" className=" w-50 sm:w-100 " />
                        </p>
                        <p className="text-xl sm:text-3xl">Welcome to our Customer Portal.</p>
                        <p className="text-xl sm:text-3xl">Sign In to see latest updates.</p>
                        <p className="text-sm sm:text-xl text-[#A9A9A9]">Enter your details to proceed further</p>
                        <div className="mt-5">
                            <div className="h-full w-full flex justify-start gap-10 align-center text-lg sm:text-xl">
                                <div>
                                    <input type="radio" value="Mobile" name="inputdata" id="mobileRadio" defaultChecked onClick={showMobilenoInput} />
                                    <label className="ml-2" htmlFor="mobileRadio">Mobile</label>
                                </div>
                                <div>
                                    <input type="radio" value="Email" name="inputdata" id="emailRadio" onClick={showEmailInput} />
                                    <label className="ml-2" htmlFor="emailRadio">Email</label>
                                </div>

                            </div>
                            <div className="mt-3">

                                <input className=" w-10/12" placeholder="Enter mobile no" type="text" name="mobile" id="mobile" maxLength={10} onChange={handleChangeMobile} />
                                <input className="hidden w-10/12 !boder-5 !focus:border-transparent !focus:ring-0 h-8 " placeholder="Enter email" type="email" name="email" id="email" onChange={handleChangeEmail} />
                            </div>
                            <hr className="w-3/4 mt-1"></hr>
                            <br />
                            <label htmlFor="otp">OTP</label><br />
                            <div className="flex flex-row gap-2">
                                <input className="mt-1" placeholder="Enter otp" type="password" name="otp" id="otp" onChange={handleChangeOtp} /><br />
                                <button className="bg-blue-500 rounded-lg text-white p-1" onClick={getOTP}>Get OTP</button>
                            </div>
                            <hr className="w-3/4 mt-1"></hr>
                            <button className="bg-blue-500 rounded-lg w-2/4 h-12 mt-8 text-white" onClick={getCustomerDetails}>Sign in</button><br />


                        </div>
                        <div className=" bottom-5 sm:bottom-0 text-xs pb-5 pt-20">
                            <img className="inline" align="center" src={evalogo} width="24" alt="Logo" /> Copyright © All copyright reserved to EVA Software Solutions</div>

                    </div>
                </div>
                <div className="hidden sm:h-full text-white w-6/12 md:block">
                    <div style={{ background: `url(${bgsignin})` }} className="h-full  w-full !bg-cover !bg-center !bg-no-repeat " >

                    </div>
                </div>
            </div>

        </div >
    )
}

export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const validMobileNo = new RegExp(
    '^[0-9]*$'
);

export default Login;