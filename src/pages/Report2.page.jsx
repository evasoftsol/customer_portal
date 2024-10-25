import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import PaymentsTable from '../components/PaymentsTable.component'
import { FcDownload } from 'react-icons/fc';
import { MdOutlineExpandMore } from 'react-icons/md';
import { MdOutlineExpandLess } from 'react-icons/md';


const Report2 = () => {
    console.log("report2=" + localStorage.getItem("report2Link"));


    return (
        <>
            <div className='hidden sm:block h-5/6 sm:h-5/6 overflow-y-auto '>
                <div className='flex ml-10 flex-row gap-20 justify-between mb-3 w-11/12 sm:w-11/12 relative my-5'>
                    <div className="font-semibold text-xl">Service Dashboard</div>
                </div>
                <div className='flex flex-col gap-2  ml-10'>

                    {/* =======For tablet or laptop view======== */}

                    {localStorage.getItem("report2Link") !== "null" ? (
                        <div style={{ textAlign: 'center' }}>
                            <h2>Google Data Studio Report</h2>

                            <div dangerouslySetInnerHTML={{ __html: localStorage.getItem("report2Link") }} />
                        </div>
                    )

                        :

                        (<div className=" sm:flex sm:flex-col rounded-lg bg-white w-11/12 sm:w-11/12 " >
                            <div className='pt-10 pb-5 pl-10 flex'>You are not subscribed to view this report!</div>
                        </div>

                        )}

                    {/* <div style={{ textAlign: 'center' }}>
                        <h2>Google Data Studio Report</h2>
                        <iframe
                            title="GDS Report"
                            width="100%"
                            height="800"
                            src="https://lookerstudio.google.com/embed/reporting/4d1891a6-2ce6-409b-8261-c1613f4dddfb/page/SQWXB"
                            frameBorder="0"
                            style={{ border: "0" }}
                            allowFullScreen
                        ></iframe>
                    </div> */}


                </div>
            </div>

        </>
    )
}

export default BaseHoc(Report2);