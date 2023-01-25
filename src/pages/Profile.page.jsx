import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import PaymentsTable from '../components/PaymentsTable.component'
import { FcDownload } from 'react-icons/fc';
import { MdOutlineExpandMore } from 'react-icons/md';
import { MdOutlineExpandLess } from 'react-icons/md';


const Profile = () => {


    return (
        <>
            <div className='hidden sm:block h-5/6 sm:h-5/6 overflow-y-auto '>
                <div className='flex ml-10 flex-row gap-20 justify-between mb-3 w-11/12 sm:w-11/12 relative my-5'>
                    <div className="font-semibold text-xl">My Profile</div>
                </div>
                <div className='flex flex-col gap-2  ml-10'>

                    {/* =======For tablet or laptop view======== */}
                    <div className=" sm:flex sm:flex-col rounded-lg bg-white w-11/12 sm:w-11/12" >
                        <div className='pt-10 pb-5 flex'><span className='font-semibold px-5 w-1/12'>ID: </span>{localStorage.getItem("customerId")}</div>
                        <div className='pt-10 pb-5 flex'><span className='font-semibold px-5 w-1/12'>Name: </span>{localStorage.getItem("customerName")}</div>
                        <div className='pb-5 flex' ><span className='font-semibold px-5 w-1/12'>Email: </span> {localStorage.getItem("customerEmail")}</div>
                        <div className='pb-5 flex'><span className='font-semibold px-5 w-1/12'>Cell No: </span> {localStorage.getItem("customerCell")}</div>
                        <div className='pb-10 flex'><span className='font-semibold px-5 w-1/12'>Address: </span> {localStorage.getItem("customerAddress")}</div>
                    </div>


                </div>
            </div>

        </>
    )
}

export default BaseHoc(Profile);