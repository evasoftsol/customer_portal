import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';

const ServiceSchedule = () => {

    // window.addEventListener("popstate", e => {  // Nope, go back to your page
    //     // this.props.history.go(1);
    //     console.log("pop called");
    // });

    const [serviceList, setServiceList] = useState(null)
    const [dateFilterVisible, setDateFilterVisible] = useState(false);
    const datefilterRef = useRef();
    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");


    useEffect(() => {
        console.log("in useEffect");
        getServiceList("btnThisMonth");
        const closeDateFilter = e => {
            console.log("in closeDateFilter" + e.currentTarget.name);
            // if (e.path[0] != datefilterRef.current) {
            setDateFilterVisible(false);
            // }
        }
        document.body.addEventListener('click', closeDateFilter);
        return () => document.body.removeEventListener('click', closeDateFilter);
    }, []);

    const getServiceList = (param) => {
        console.log("in getServiceList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=1/11/2021&toDate=3/11/2021&apiCallfrom=CustomerPortal";
        let url = "";
        console.log("selectedDateFilter " + param);

        const current = new Date();
        let month = current.getMonth() + 1;
        let fromDate = "";
        let toDate = "";


        if (param === "btnThisMonth") {
            fromDate = "1/" + month + "/" + current.getFullYear();
            if (month === 12) {
                let year = current.getFullYear() + 1;
                toDate = "1/01/" + year;
            } else {
                month += 1;
                toDate = "1/" + month + "/" + current.getFullYear()
            }
        } else if (param === "btnLast") {
            toDate = "1/" + month + "/" + current.getFullYear();
            if (month === 1) {
                let year = current.getFullYear() - 1;
                fromDate = "1/12/" + year;
            } else {
                month = month - 1;
                fromDate = "1/" + month + "/" + current.getFullYear();
            }
        } else if (param === "btnNext") {
            if (month === 12) {
                let year = current.getFullYear() + 1;
                fromDate = "1/01/" + year;
                toDate = "1/02/" + year;
            } else if (param === "btnCustom") {
                // if (month === 12) {
                //     let year = current.getFullYear() + 1;
                //     fromDate = "1/01/" + year;
                //     toDate = "1/02/" + year;
            }
            else {
                month += 1;
                fromDate = "1/" + month + "/" + current.getFullYear();
                if (month === 12) {
                    let year = current.getFullYear() + 1;
                    toDate = "1/01/" + year;
                } else {
                    month += 1;
                    toDate = "1/" + month + "/" + current.getFullYear();
                }
            }

        } else if (param === "btnCustom") {

        }
        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);
        url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallfrom=CustomerPortal";

        console.log("url=" + url);

        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                setServiceList(json)
                console.log("result is set to servicelist");
            })
            .catch((error) => {
                setServiceList(null);
                console.log("service list set to null");
            });
    }

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

    const scheduleService = event => {
        event.preventDefault();
        alert("scheduleService clicked" + event.currentTarget.name);
    }

    const applyDateFilter = event => {
        event.preventDefault();
        alert("Date filter clicked" + event.currentTarget.id);
        setDateFilterVisible(false);
        getServiceList(event.currentTarget.id);
    }


    if (!serviceList) return (<div>No Record Found</div>)
    return (
        <>
            <div className='flex ml-10 flex-row justify-between mb-3 w-11/12 relative my-5'>
                <div className="font-semibold text-xl">Service Schedule</div>
                <button ref={datefilterRef} name="dateFilter" id="dateFilter" onClick={() => setDateFilterVisible((prev) => !prev)}><FiFilter /></button>
                {dateFilterVisible && (
                    <div className='flex flex-col gap-2 border p-2 rounded-lg absolute top-7 right-1 z-20 shadow-lg border-slate-200 bg-white'>
                        <button className="bg-white rounded" id="btnThisMonth" onClick={applyDateFilter}>This Month</button>
                        <button id="btnNext" onClick={applyDateFilter}>Next Month</button>
                        <button id="btnLast" onClick={applyDateFilter}>Last Month</button>
                        <button id="btnCustom" onClick={applyDateFilter}>Custom</button>
                    </div>
                )}
            </div>
            <div className='flex w-full h-full ml-10'>

                <table className="table-auto border-collapse border-spacing-2 rounded-lg bg-white w-11/12 " >

                    <thead className="bg-red">
                        <tr className="text-left text-[#8181A5] text-sm  ">
                            <th className="py-8 px-2">Service ID</th>
                            <th className="py-8 px-2">Date</th>
                            <th className="py-8 px-2">Name</th>
                            <th className="py-8 px-2">Status</th>
                            <th className="py-8 px-2">Action</th>
                            <th className="py-8 px-2">Rating</th>
                        </tr>
                    </thead>
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
                                            (<button name={service.serviceId} onClick={scheduleService}><AiOutlineCalendar /></button>)
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
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default BaseHoc(ServiceSchedule);
