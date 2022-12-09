import React, { useState } from 'react'
import BaseHoc from '../hoc/BaseHoc'

const AttendanceAndPayroll = () => {

    const [loading, setLoadting] = useState(true);
    return (
        <>AttendanceAndPayroll
            {loading ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                    ></div>
                    <div className="flex justify-center items-center min-h-screen">
                        <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                            <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </>

    )
}

export default BaseHoc(AttendanceAndPayroll);