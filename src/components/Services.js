import React, { useState } from 'react'
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import Axios from 'axios';
import DatePicker from "react-datepicker";


const Services = ({ serviceList, loading }) => {
    const [showModal, setShowModal] = useState(false);
    if (loading) {
        return <tr><td colspan="6">Loading....</td></tr>;
    }

    let appid = localStorage.getItem("appId");
    const downloadSR = event => {
        event.preventDefault();
        let srcopyurl = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=5659313586569216&documentName=Service&documentId=" + event.currentTarget.name;

        Axios
            .get(srcopyurl)
            .then((response) => response.data)
            .then((json) => {
                console.log('json', json.pdfUrl);
                window.open(json.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch((error) => {
                console.log(error);
            });

    }
    let selectedServiceId = "";
    const scheduleService = event => {
        event.preventDefault();
        // alert("scheduleService clicked" + event.currentTarget.name);
        selectedServiceId = event.currentTarget.name;
        setShowModal(true);
    }
    const reschedule = (event) => {
        event.preventDefault();
        alert("scheduleService clicked" + selectedServiceId);
        setShowModal(false);
    }


    return (
        <tbody className="text-sm mx-4">
            {serviceList.map(service => (
                <tr key={service.serviceId}>
                    <td className="px-2 py-2">{service.serviceId}</td>
                    <td className="px-2 py-2">{service.serviceDate}</td>
                    <td className="px-2 py-2">{service.productName}</td>
                    <td className="px-2 py-2">{service.status}</td>
                    <td className="px-2 py-2">
                        {
                            service.status === "Completed" ?
                                (<button name={service.serviceId} onClick={downloadSR}><FcDownload /></button>) :
                                (<button name={service.serviceId} onClick={scheduleService}><AiOutlineCalendar /></button>
                                )

                        }

                    </td>
                    <td className="px-2 py-2">{

                        service.customerFeedback === "Poor" ? ("*") :
                            (service.customerFeedback === "Average" ? ("**") :
                                (service.customerFeedback === "Good" ? ("***") :
                                    (service.customerFeedback === "Very Good" ? ("****") :
                                        (service.customerFeedback === "Excellent" ? ("*****") : ("")))))
                    }
                    </td>


                </tr>

            ))}
            <tr><td>
                {showModal ? (

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="mt-2 text-left sm:ml-4 sm:text-left">
                                        <div>
                                            <label htmlFor='rescheduleDate' className='m-2 p-2'>Select date:</label><br />
                                            <input type="date" id="rescheduleDate" className='m-2 p-2 border-2 w-3/4 rounded' />
                                        </div>
                                        <div>
                                            <label htmlFor='rescheduleTime' className='m-2 p-2'>Select time:</label><br />
                                            <input type="time" id="rescheduleTime" className='m-2 p-2 border-2 w-3/4 rounded' />
                                        </div>
                                        <div>
                                            <label htmlFor='rescheduleReason' className='m-2 p-2'>Reason:</label><br />
                                            <textarea id="rescheduleReason" className='m-2 p-2 border-2 w-3/4 rounded'></textarea>
                                        </div>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-sky-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                                onClick={reschedule}
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : null}
            </td></tr>
        </tbody>
    )
}


export default Services;


