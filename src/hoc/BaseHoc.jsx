
import React from "react";

const BaseHoc = (Component) => ({ ...props }) => {

    return (
        <div className="w-screen h-screen">
            <div className="w-screen h-50 m-5 text-center text-4xl border-b-2">Welcome {localStorage.getItem("customerName")}</div>
            <div className="flex flex-row">
                <div className="flex flex-col w-1/4 h-full border-r-2 gap-5">
                    <div className="text-xl">Service Schedule</div>
                    <div className="text-xl">Complaints</div>
                    <div className="text-xl">Payments</div>
                    <div className="text-xl">Contracts / Renewals</div>
                    <div className="text-xl">Project</div>
                </div>
                <div className="w-3/4 h-full">
                    <Component {...props} />
                </div>
            </div>
        </div>
    )
};


export default BaseHoc;