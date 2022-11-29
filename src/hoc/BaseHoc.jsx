
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../pages/Login.page";
import bgimageblue from '../images/bg-login-mobile.jpg'
import { ImClipboard } from 'react-icons/im';
import { BiLogOut } from 'react-icons/bi';

const BaseHoc = (Component) => ({ ...props }) => {


    // const parameters = new URLSearchParams(search);
    // console.log("Component=" + Component);
    // console.log("props=" + props);
    const clearData = event => {
        localStorage.clear();
    }

    let imageurl = "";
    if (localStorage.getItem("appId"))
        imageurl = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/getimage?width=100&height=1024"
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
                {/* <div className="w-screen h-screen"> */}
                {/* <div className="w-screen h-50 m-5 text-center border-b-2 flex flex-col gap-2 sm:flex-row justify-center align-center m-auto text-white" style={{ background: `url(${bgimageblue})` }}>
                        <div className="text-center flex justify-center align-center">
                            <img src={imageurl} alt="company logo" className="w-50 sm:w-100" />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl "> {localStorage.getItem("customerName")} ({localStorage.getItem("customerId")})</p>
                            <p className="text-lg sm:text-xl "> {localStorage.getItem("customerCell")} / {localStorage.getItem("customerEmail")}</p>
                            <p className="text-lg sm:text-xl ">{localStorage.getItem("customerAddress")}</p>
                        </div>
                    </div> */}
                <div className="flex flex-row justify-center  w-full h-screen">
                    {/* Navbar for Medium or Larger screens */}
                    <div className="flex flex-col justify-start  w-2/12 h-full border-r-2 gap-2 hidden sm:flex text-md text-[#8181A5] ml-5">
                        <div className="flex justify-start ml-2 mt-2 align-center">
                            <img src={imageurl} alt="company logo" className="w-50 sm:w-100" />
                        </div>
                        {route === "/services" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/services" >Service Schedule</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/services" >Service Schedule</Link>
                            </div>)}

                        {route === "/complaints" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/complaints" >Complaints</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/complaints" >Complaints</Link>
                            </div>)}

                        {route === "/payments" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/payments" >Payments</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/payments" >Payments</Link>
                            </div>)}

                        {route === "/contracts" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/contracts" >Contracts / Renewals</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/contracts" >Contracts / Renewals</Link>
                            </div>)}

                        {route === "/projects" ?
                            (<div className="w-full border-r-2 border-sky-600">
                                <div className="hover:text-black !text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/projects" >Project</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/projects" >Project</Link>
                            </div>)}

                        <div className="flex flex-row justify-start gap-4 hover:text-black w-3/4 p-3">
                            <div className="!text-2xl"><BiLogOut /></div>
                            <Link to="/" onClick={clearData}>Logout</Link>
                        </div>
                    </div>


                    {/* Navbar for Mobile screen */}
                    <div className="absolute bottom-0 flex flex-row gap-0 w-full h-100 sm:hidden bg-white text-[#8181A5] " >
                        <div className="flex justify-start ml-2 mt-2 align-center">
                            <img src={imageurl} alt="company logo" className="w-50 sm:w-100" />
                        </div>
                        {route === "/services" ?
                            (<div className="w-full border-t-2 border-sky-600">
                                <div className="hover:text-black !text-black w-full h-full flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/services" >Service Schedule</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/services" >Service Schedule</Link>
                            </div>)}

                        {route === "/complaints" ?
                            (<div className="w-full border-t-2 border-sky-600">
                                <div className="hover:text-black !text-black w-full h-full flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/complaints" >Complaints</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/complaints" >Complaints</Link>
                            </div>)}

                        {route === "/payments" ?
                            (<div className="w-full border-t-2 border-sky-600">
                                <div className="hover:text-black !text-black w-full h-full flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/payments" >Payments</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/payments" >Payments</Link>
                            </div>)}

                        {route === "/contracts" ?
                            (<div className="w-full border-t-2 border-sky-600">
                                <div className="hover:text-black !text-black w-full h-full flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/contracts" >Contracts / Renewals</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/contracts" >Contracts / Renewals</Link>
                            </div>)}

                        {route === "/projects" ?
                            (<div className="w-full border-t-2 border-sky-600">
                                <div className="hover:text-black !text-black w-full h-full flex flex-row justify-start gap-4 align-center rounded-lg bg-[#EFF2FE] p-3 ">
                                    <div className="!text-xl"><ImClipboard /></div>
                                    <Link to="/projects" >Project</Link>
                                </div></div>) :
                            (<div className="hover:text-black w-3/4 flex flex-row justify-start gap-4 align-center rounded-lg p-3 ">
                                <div className="!text-xl"><ImClipboard /></div>
                                <Link to="/projects" >Project</Link>
                            </div>)}

                        <div className="flex flex-row justify-start gap-4 hover:text-black w-3/4 p-3">
                            <div className="!text-2xl"><BiLogOut /></div>
                            <Link to="/" onClick={clearData}>Logout</Link>
                        </div>


                    </div>
                    <div className="w-10/12 h-full sm:w-10/12 bg-[#EFF2FE]">
                        <Component {...props} />
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