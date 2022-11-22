
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../pages/Login.page";

const BaseHoc = (Component) => ({ ...props }) => {


    // const parameters = new URLSearchParams(search);
    // console.log("Component=" + Component);
    // console.log("props=" + props);
    const clearData = event => {
        localStorage.clear();
    }

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
        // if (route == "/services") {
        //     console.log("in if");
        //     return (
        //         <>
        //             <div className="w-screen h-screen">
        //                 <div className="w-screen h-50 m-5 text-center text-4xl border-b-2">Welcome {localStorage.getItem("customerName")}</div>
        //                 <div className="flex flex-row">
        //                     <div className="flex flex-col w-1/4 h-full border-r-2 gap-5">
        //                         <div className="text-xl bg-red-400 hover:bg-stone-300" ><Link to="/services" > Service Schedule</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/complaints" >Complaints</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/payments" >Payments</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/contracts" >Contracts / Renewals</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/projects" >Project</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/" onClick={clearData}>Logout</Link></div>
        //                         <div className="text-xl hover:bg-stone-300"><Link to="/emp" >Employee List</Link></div>
        //                     </div>
        //                     <div className="w-3/4 h-full">
        //                         <Component {...props} />
        //                     </div>
        //                 </div >
        //             </div >
        //             <Outlet />
        //         </>
        //     )

        // } else {
        //     console.log("in else");
        return (
            <>
                <div className="w-screen h-screen">
                    <div className="w-screen h-50 m-5 text-center border-b-2">
                        <p className="text-3xl"> {localStorage.getItem("customerName")} ({localStorage.getItem("customerId")})</p>
                        <p className="text-xl"> {localStorage.getItem("customerCell")} / {localStorage.getItem("customerEmail")}</p>
                        <p className="text-xl">{localStorage.getItem("customerAddress")}</p>
                    </div>
                    <div className="flex flex-row justify-center w-full">
                        <div className="flex flex-col justify-center align-center w-1/4 h-full border-r-2 gap-5">
                            {route === "/services" ?
                                (<div className="text-xl hover:bg-stone-300 bg-cyan-400  w-3/4"><Link to="/services" > Service Schedule</Link></div>) :
                                (<div className="text-xl hover:bg-stone-300  w-3/4"><Link to="/services" > Service Schedule</Link></div>)}

                            <div className="text-xl hover:bg-stone-300 w-3/4"><Link to="/complaints" >Complaints</Link></div>
                            <div className="text-xl hover:bg-stone-300 w-3/4"><Link to="/payments" >Payments</Link></div>
                            <div className="text-xl hover:bg-stone-300 w-3/4"><Link to="/contracts" >Contracts / Renewals</Link></div>
                            <div className="text-xl hover:bg-stone-300 w-3/4"><Link to="/projects" >Project</Link></div>
                            <div className="text-xl hover:bg-stone-300 w-3/4"><Link to="/" onClick={clearData}>Logout</Link></div>
                        </div>
                        <div className="w-3/4 h-full ">
                            <Component {...props} />
                        </div>
                    </div >
                </div >
                <Outlet />
            </>
        )
        // }
    }
};




export default BaseHoc;