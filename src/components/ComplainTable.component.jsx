import React, { useState, useEffect, useRef } from 'react'


const ComplainTable = ({ complainList, loading }) => {
    // const [showReschedulePopup, setShowReschedulePopup] = useState({ serviceId: '', visibility: false });
    // const [showRatingPopup, setShowRatingPopup] = useState({ serviceId: '', visibility: false });

    if (loading) {
        return <tr><td >Loading....</td></tr>;
    }

    let appid = localStorage.getItem("appId");

    return (
        <tbody className="text-sm mx-4">
            {complainList.map(complain => (
                <tr key={complain.count} >
                    <td className="px-2 py-2 ">{complain.count}</td>
                    <td className="px-2 py-2 ">{complain.complainDate}</td>
                    <td className="px-2 py-2 ">{complain.compStatus}</td>
                    <td className="px-2 py-2 ">{complain.description}</td>
                </tr>

            ))}

        </tbody>
    )
}

export default ComplainTable