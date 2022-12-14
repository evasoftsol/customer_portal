import React, { useState } from 'react'
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc'
import { FaStar } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { MdSchedule } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import Axios from 'axios';


const ServicesTable = ({ serviceList, loading }) => {
    const [showReschedulePopup, setShowReschedulePopup] = useState({ serviceId: '', visibility: false });
    const [showRatingPopup, setShowRatingPopup] = useState({ serviceId: '', visibility: false });
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    let companyId = localStorage.getItem("companyId");
    if (loading) {
        return <tr><div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
            ></div>
            <div className="flex justify-center items-center min-h-screen">
                <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                    <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                </div>
            </div>
        </div></tr>;
    } else {
        console.log("serviceList in services table" + serviceList)
    }

    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");
    let customerId = localStorage.getItem("customerId");
    let customerName = localStorage.getItem("customerName");


    const downloadSR = event => {
        event.preventDefault();
        let srcopyurl = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=Service&documentId=" + event.currentTarget.name;

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
        setShowReschedulePopup({ ...showReschedulePopup, serviceId: selectedServiceId, visibility: true });
    }
    const reschedule = (event) => {
        event.preventDefault();
        let rDate = document.getElementById("rescheduleDate").value;

        // let rTime = document.getElementById("rescheduleTime").value;
        let rReason = document.getElementById("rescheduleReason").value;
        // console.log("scheduleService date=" + rDate + " time=" + rTime + " reason=" + rReason + " service id=" + showReschedulePopup.serviceId);
        if (rDate == "") {
            alert("Select date")
            // } else if (rTime == "") {
            //     alert("Select time")
        } else if (rReason == "") {
            alert("Give reason")
        }
        else {
            // http://my.evadev0006.appspot.com/slick_erp/rescheduleServiceDataUpload?authCode=5659313586569216&apiCallFrom=CustomerPortal&serviceId=600001244&rescheduleDate=20-1-2021&rescheduleTime=20:05&rescheduleReason=reason

            let selectedDate = new Date(rDate);
            const currentDate = new Date();
            // console.log("selected day" + selectedDate.getDate() + " month=" + selectedDate.getMonth() + " year=" + selectedDate.getFullYear() + " " + selectedDate.getTime());
            // console.log("current day" + currentDate.getDate() + " month=" + currentDate.getMonth() + " year=" + currentDate.getFullYear() + " " + currentDate.getTime());

            // selectedDate.setHours(rTime.split(':')[0]);
            // selectedDate.setMinutes(rTime.split(':')[1]);

            let hours = parseInt(document.getElementById('hourSelector').value);
            let mins = parseInt(document.getElementById('minuteSelector').value);
            let ampm = document.getElementById('ampmSelector').value;
            if (ampm === "AM" && hours === "12") {
                hours = 0;
            }
            if (ampm === "PM") {
                if (hours != 12) {
                    hours = hours + 12;
                }
            }
            selectedDate.setHours(hours);
            selectedDate.setMinutes(mins);
            let rTime = "";
            if (hours < 10) {
                rTime += "0" + hours;
            } else {
                rTime += hours;
            }
            if (mins < 10) {
                rTime += ":0" + mins;
            } else {
                rTime += ":" + mins;
            }

            console.log("selected time=" + selectedDate.getTime());
            // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            // let formatedDateString = selectedDate.getDate() + "-" + monthNames[selectedDate.getMonth()] + "-" + selectedDate.getFullYear();
            let month = selectedDate.getMonth() + 1;
            let formatedDateString = selectedDate.getDate() + "-" + month + "-" + selectedDate.getFullYear();
            if (selectedDate < currentDate)
                alert("You cannot schedule a service for past date");
            else {
                let url = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/rescheduleServiceDataUpload?authCode=" + companyId + "&apiCallFrom=CustomerPortal&serviceId=" + showReschedulePopup.serviceId + "&rescheduleDate=" + formatedDateString + "&rescheduleTime=" + rTime + "&rescheduleReason=" + rReason;
                console.log(url);

                Axios
                    .get(url)
                    .then((response) => {

                        console.log('response.data', response);
                        if (response.data == "Success\n") {
                            alert("Service has been rescheduled successfully!")

                            const updatedServiceList = serviceList.filter(service => {
                                if (service.serviceId == showReschedulePopup.serviceId) {
                                    service.serviceDate = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                                    service.status = "Rescheduled"
                                    return service;
                                } else {
                                    return service;
                                }
                            })
                            serviceList = updatedServiceList;
                            const element = document.getElementById(showReschedulePopup.serviceId);
                            element.innerHTML = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                            element.nextSibling.nextSibling.innerHTML = "Rescheduled";
                            setShowReschedulePopup({ ...showReschedulePopup, serviceId: "", visibility: false });
                        } else
                            alert("Failed to reschedule service!")
                        setShowReschedulePopup({ ...showReschedulePopup, serviceId: "", visibility: false });
                    })
                    .catch((error) => {
                        alert(error);
                        setShowReschedulePopup({ ...showReschedulePopup, serviceId: "", visibility: false });
                    });


            }
        }


    }


    //Feedback related methods
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    const submitFeedback = event => {
        event.preventDefault();
        if (currentValue == 0) {
            alert("Give stars");
            return;
        }

        let remark = document.getElementById("customerFeedback").value;
        if (currentValue < 3) {
            if (remark == "") {
                alert("Enter remark");
                return;
            }
        }
        let rating = currentValue * 2;
        const url = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/serviceschedulingbycustomer?action=Customer%20Support&serviceId=" + showRatingPopup.serviceId + "&ratings=" + rating + "&range=5&remark=" + remark;
        let serviceObj = null;
        Axios.get(url).then(
            (response) => {
                console.log("response=" + response.status + " " + response.statusText)
                if (response.status === 200) {
                    // alert("Feedback submitted successfully!");
                    const updatedServiceList = serviceList.filter(service => {
                        if (service.serviceId == showRatingPopup.serviceId) {
                            if (currentValue === 1)
                                service.customerFeedback = "Poor";
                            else if (currentValue === 2)
                                service.customerFeedback = "Average";
                            else if (currentValue === 3)
                                service.customerFeedback = "Good";
                            else if (currentValue === 4)
                                service.customerFeedback = "Very Good";
                            else if (currentValue === 5)
                                service.customerFeedback = "Excellent";
                            serviceObj = service;
                            console.log("serviceObj=" + serviceObj);
                            return service;
                        } else {
                            return service;
                        }
                    })
                    serviceList = updatedServiceList;

                    if (currentValue < 3) {

                        let dueDate = new Date();
                        dueDate.setDate(dueDate.getDate() + 2);
                        let month = dueDate.getMonth() + 1;
                        let dateString = dueDate.getDate() + "-" + month + "-" + dueDate.getFullYear();


                        let data = '{"screenName":"createComplain","authCode":"' + companyId + '","apiCallFrom":"CustomerPortal","serviceId":"' + showRatingPopup.serviceId + '","customerId":"' + customerId + '","description":"' + remark + '","personResponsible":"","branch":"' + serviceObj.branch + '","assignTo":"","dueDate":"' + dateString + '","callerName":"' + customerName + '","callerNo":"' + customerCell + '","callerEmail":"' + customerEmail + '","category":"","productId":"' + serviceObj.productId + '","productName":"' + serviceObj.productName + '","customerBranch":"' + serviceObj.serviceBranch + '","contractId":"' + serviceObj.contractId + '"}';


                        let url = "https://" + appid + ".appspot.com/slick_erp/anylaticsDataCreation?data=" + data;

                        console.log(url);
                        Axios
                            .get(url)
                            .then((response) => {
                                alert("We have received your complaint " + response.data + ". We will get back to you shortly.");
                                setShowRatingPopup({ ...showRatingPopup, serviceId: "", visibility: false });
                            })
                            .catch((error) => {
                                console.log(error);
                                alert(error);
                                setShowRatingPopup({ ...showRatingPopup, serviceId: "", visibility: false });
                            });
                    }
                    // let updatedStars = "";
                    // for (let i = 0; i < currentValue; i++) {
                    //     updatedStars += "*";
                    // }
                    // document.getElementById(showRatingPopup.serviceId).nextSibling.nextSibling.nextSibling.innerHTML = updatedStars;
                } else
                    alert("Try to submit again!");
                if (currentValue > 2) {
                    alert("Feedback submitted successfully!");
                    setShowRatingPopup({ ...showRatingPopup, serviceId: "", visibility: false });
                }
            }
        ).catch((exception) => {
            console.log("Error is" + exception);
        })


    }

    return (
        <tbody className="text-sm mx-4">
            {
                serviceList !== null ? (serviceList.map(service => (
                    <tr key={service.serviceId}>
                        <td className="px-2 py-1 sm:py-2">{service.serviceId}</td>
                        <td className="px-2 py-1 sm:py-2">{service.serviceBranch === "Service Address" ? ("Main Branch") : (service.serviceBranch)} </td>
                        <td className="px-2 py-1 sm:py-2" id={service.serviceId}>{service.serviceDate}</td>
                        <td className="px-2 py-1 sm:py-2">{service.productName}</td>
                        <td className="px-2 py-1 sm:py-2" >{service.status}</td>
                        <td className="px-2 py-1 sm:py-2">
                            {
                                service.status === "Completed" ?
                                    (<button name={service.serviceId} onClick={downloadSR}><FcDownload /></button>) :
                                    (service.status === "Cancelled" || service.status === "Suspended" ? (null) : (<button name={service.serviceId} onClick={scheduleService}><AiOutlineCalendar /></button>)
                                    )

                            }
                            {/* <button name={service.serviceId} onClick={scheduleService}><AiOutlineCalendar /></button> */}
                        </td>
                        <td className="px-2 py-1 sm:py-2 text-xs">{
                            service.status === "Completed" ? (service.customerFeedback === null ? (<button name={service.serviceId} onClick={() => setShowRatingPopup({ ...showRatingPopup, serviceId: service.serviceId, visibility: true })}><VscFeedback className='text-xl' /></button>) : (

                                service.customerFeedback === "Poor" ? (<FaStar className='text-[#FFBA5A]' />) :
                                    (service.customerFeedback === "Average" ?
                                        (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                        (service.customerFeedback === "Good" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                            (service.customerFeedback === "Very Good" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                                (service.customerFeedback === "Excellent" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) : ("")))))

                            )) : (null)
                        }
                        </td>


                    </tr>

                ))) : (<tr>No data found</tr>)

            }
            <tr><td>
                {showReschedulePopup.visibility ? (

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowReschedulePopup({ ...showReschedulePopup, serviceId: "", visibility: false })}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 ">
                            <div className="relative w-full max-w-lg p-1 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="mt-2 text-left sm:ml-4 sm:text-left">
                                        <h2 className="text-xl  mb-4">Select the date on which you want to have a service.</h2>
                                        <h2 id="rescheduleError" className='text-red'></h2>
                                        <div>
                                            <label htmlFor='rescheduleDate' className='m-2 p-2 font-semibold'>Select date :</label><br />
                                            <input type="date" id="rescheduleDate" className='m-4 p-2 border-2 w-3/4 rounded-lg' />
                                        </div>
                                        <div>
                                            <label className='m-2 p-2 font-semibold'>Select time :</label><br />
                                            {/* <input type="time" id="rescheduleTime" className='m-4 p-2 border-2 w-3/4 rounded' /> */}
                                            <div className='flex gap-2 p-2'>
                                                <select id='hourSelector' className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                                <select id="minuteSelector" className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                    <option value="00">00</option>
                                                    <option value="05">05</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                    <option value="20">20</option>
                                                    <option value="25">25</option>
                                                    <option value="30">30</option>
                                                    <option value="35">35</option>
                                                    <option value="40">40</option>
                                                    <option value="45">45</option>
                                                    <option value="50">50</option>
                                                    <option value="55">55</option>
                                                </select>
                                                <select id="ampmSelector" className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                    <option value="AM">AM</option>
                                                    <option value="PM">PM</option>
                                                </select>

                                            </div>

                                        </div>
                                        <div>
                                            <label htmlFor='rescheduleReason' className='m-2 p-2 font-semibold'>Reason :</label><br />
                                            <textarea id="rescheduleReason" className='mx-4 mt-4 p-2 border-2 w-3/4 rounded-lg'></textarea>
                                        </div>
                                        <div className="items-center gap-10 mt-3 flex justify-center">
                                            <button
                                                className=" my-2 p-2.5 w-32 text-white bg-sky-600 text-lg rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                                onClick={reschedule}
                                            >
                                                Reschedule
                                            </button>
                                            <button
                                                className=" my-2 p-2.5 w-32 text-white text-lg bg-sky-600  rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setShowReschedulePopup({ ...showReschedulePopup, serviceId: "", visibility: false })
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
            <tr><td>
                {showRatingPopup.visibility ? (

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowRatingPopup({ ...showRatingPopup, serviceId: "", visibility: false })}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                {/* <div className="mt-3 sm:flex"> */}
                                {/* <div className="mt-2 text-left sm:ml-4 sm:text-left"> */}

                                <div className='flex flex-col align-center justify-center gap-5 m-5'>
                                    <h2 className="font-semibold text-lg"> Rate the Service </h2>
                                    <div className='flex flex-row gap-2 w-fit'>
                                        {stars.map((_, index) => {
                                            return (
                                                <>
                                                    {(hoverValue || currentValue) > index ? (
                                                        <FaStar
                                                            key={index}
                                                            size={24}
                                                            onClick={() => handleClick(index + 1)}
                                                            onMouseOver={() => handleMouseOver(index + 1)}
                                                            onMouseLeave={handleMouseLeave}
                                                            className=' cursor-pointer text-3xl text-[#FFBA5A]'
                                                        />
                                                    ) : (
                                                        <FaStar
                                                            key={index}
                                                            size={24}
                                                            onClick={() => handleClick(index + 1)}
                                                            onMouseOver={() => handleMouseOver(index + 1)}
                                                            onMouseLeave={handleMouseLeave}
                                                            className=' cursor-pointer text-3xl text-[#a9a9a9]'
                                                        />
                                                    )

                                                    }
                                                </>

                                            )
                                        })}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label htmlFor='customerFeedback' className="text-md font-semibold mt-3" >Enter Remark:</label>
                                        <textarea id="customerFeedback" className="border-2 border-gray-300 rounded w-lg mt-3" rows="5" ></textarea>
                                    </div>

                                    <button className=" mt-2 p-2.5 flex-1 text-white bg-sky-600 text-lg rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                        onClick={submitFeedback}>
                                        Submit
                                    </button>

                                </div>
                                {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                ) : null}
            </td></tr>
        </tbody>
    )
}

export default ServicesTable;



