
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../pages/Login.page";
import bgimageblue from '../images/bg-login-mobile.jpg'
import { ImClipboard } from 'react-icons/im';
import { BiLogOut } from 'react-icons/bi';
import complaint from '../images/complaint.png'
import contract from '../images/contract.png'
import renewal from '../images/renewal.png'
import serviceimg from '../images/serviceimg.png'
import timechart from '../images/timechart.png'
import invoicereceipt from '../images/invoicereceipt.png'
import logoutimg from '../images/logoutimg.jpg'

const BaseHoc = (Component) => ({ ...props }) => {


    // const parameters = new URLSearchParams(search);
    // console.log("Component=" + Component);
    // console.log("props=" + props);
    const clearData = event => {
        localStorage.clear();
    }

    let imageurl = "";
    if (localStorage.getItem("appId"))
        imageurl = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/getimage?width=70&height=1024"
    if (!localStorage.getItem("customerName")) {

        return (
            <>
                <Login />
            </>
        )

    } else {
        let address = window.location.href;
        let route = address.substring(address.lastIndexOf("/"));
        console.log("route in else is=" + route);

        return (
            <>
                <div className="flex flex-col sm:flex-row justify-center w-screen h-screen">
                    {/* Navbar for Medium or Larger screens */}
                    <div className="flex flex-col justify-start  sm:w-2/12 h-full border-r-2 gap-2 hidden sm:flex text-md text-[#8181A5] pl-5">
                        <div className="flex justify-center ml-2 mt-2 align-center">
                            <img src={imageurl} alt="company logo" className="w-50 sm:w-50" />
                        </div>
                        {route === "/profile" ?
                            (
                                <div className="w-full border-r-2 border-sky-600">
                                    <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                        <div className="!text-xl"><ImClipboard /></div>
                                        <Link to="/profile" >My Profile</Link>
                                    </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/profile" >My Profile</Link>
                            </div>)}

                        {route === "/services" ?
                            (
                                <div className="w-full border-r-2 border-sky-600">
                                    <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                        <div className="!text-xl"><ImClipboard /></div>
                                        <Link to="/services" >Service Schedule</Link>
                                    </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/services" >Service Schedule</Link>
                            </div>)}

                        {route === "/complaints" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/complaints" >Complaints</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/complaints" >Complaints</Link>
                            </div>)}

                        {route === "/payments" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/payments" >Payments</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/payments" >Payments</Link>
                            </div>)}

                        {route === "/contracts" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/contracts" >Contracts</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/contracts" >Contracts</Link>
                            </div>)}

                        {route === "/renewals" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/renewals" >Renewals</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/renewals" >Renewals</Link>
                            </div>)}

                        {/* {route === "/projects" ?
                        (<div className="w-full border-r-2 border-sky-600">
                            <div className="hover:text-black !text-black min-w-min w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/projects" >Attendance & Payroll</Link>
                            </div></div>) :
                        (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                            <div className="!text-xl"><ImClipboard /></div>
                            <Link to="/projects" >Attendance & Payroll</Link>
                        </div>)} */}

                        <div className="flex flex-row justify-start gap-4 hover:text-black w-3/4 p-3">
                            <div className="!text-2xl"><BiLogOut /></div>
                            {/* <Link to="/" onClick={clearData}>Logout</Link> */}
                            <Link to={{ pathname: "/login", search: "?authToken=" + localStorage.getItem("appId") }} onClick={clearData}>Logout</Link>

                        </div>
                    </div>



                    <div className="w-screen h-5/6 sm:h-full sm:w-10/12 bg-[#EFF2FE] overflow-y-auto">{/*removed w-full which removed white spacing rigfht to the table in mobile view */}
                        <Component {...props} />
                    </div>


                    {/* Navbar for Mobile screen */}
                    {/* <div className="fixed bottom-0 flex flex-row justify-between align-center gap-2 w-screen h-1/6 sm:hidden bg-white text-[#8181A5]" > */}
                    <div className="flex flex-row justify-between align-center gap-2 w-screen h-1/6 sm:hidden bg-white text-[#8181A5]" >
                        {/* <div className="flex justify-start ml-2 mt-2 align-center">
                            <img src="https://my-dot-evadev0006.appspot.com/slick_erp/getimage?width=50&height=50" alt="company logo" className="w-40 " />
                        </div> */}


                        {route === "/services" ?
                            (<Link to="/services" className="shrink-0"><img src={serviceimg} alt="company logo" className="w-10 h-auto my-2 ml-2 border-[#c3c3c3] border-2 w-12 shrink-0 p-1" /></Link>) :
                            (<Link to="/services" className="shrink-0"><img src={serviceimg} alt="company logo" className="w-10 h-auto my-2 ml-2  shrink-0 p-1" /></Link>)}

                        {route === "/complaints" ?
                            (<Link to="/complaints" className="shrink-0"><img src={complaint} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1 border-[#c3c3c3] border-2 w-12" /></Link>) :
                            (<Link to="/complaints" className="shrink-0"><img src={complaint} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1" /></Link>)}

                        {route === "/payments" ?
                            (<Link to="/payments" className="shrink-0"><img src={invoicereceipt} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1 border-[#c3c3c3] border-2 w-12" /></Link>) :
                            (<Link to="/payments" className="shrink-0"><img src={invoicereceipt} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1" /></Link>)}

                        {route === "/contracts" ?
                            (<Link to="/contracts" className="shrink-0"><img src={contract} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1 border-[#c3c3c3] border-2 w-12" /></Link>) :
                            (<Link to="/contracts" className="shrink-0"><img src={contract} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1" /></Link>)}

                        {route === "/renewals" ?
                            (<Link to="/renewals" className="shrink-0" ><img src={renewal} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1 border-[#c3c3c3] border-2 w-12" /></Link>) :
                            (<Link to="/renewals" className="shrink-0" ><img src={renewal} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1" /></Link>)}

                        {/* {route === "/projects" ?
                        (<Link to="/projects" className="shrink-0"> <img src={timechart} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1 border-[#c3c3c3] border-2 w-12" /></Link>) :
                        (<Link to="/projects" className="shrink-0"> <img src={timechart} alt="company logo" className="w-10 h-auto my-2 shrink-0  p-1" /></Link>)} */}



                        {/* <Link to="/" onClick={clearData} className="shrink-0"> */}
                        <Link to={{ pathname: "/login", search: "?authToken=" + localStorage.getItem("appId") }} onClick={clearData} className="shrink-0"><img src={logoutimg} alt="company logo" className="w-10 h-auto shrink-0  my-2 mr-2 hover:border-[#c3c3c3] hover:border-2 p-1" /></Link>




                    </div>
                </div >
                {/* </div > */}
                <Outlet />
            </>
        )
        // }
    }
};




export default BaseHoc;