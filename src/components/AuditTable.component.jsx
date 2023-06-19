

import React, { useState } from 'react'
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc'
import { FaStar } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { MdSchedule } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import Axios from 'axios';


const AuditTable = ({ auditList, loading }) => {
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
        console.log("auditList in audits table" + auditList)
    }

    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");
    let customerId = localStorage.getItem("customerId");
    let customerName = localStorage.getItem("customerName");


    const downloadReport = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=Assessment Report&documentId=" + event.currentTarget.name;
        console.log('url', url);
        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                // console.log('json', json.pdfUrl);
                window.open(json.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch((error) => {
                console.log(error);
            });

    }
    let selectedassessmentId = "";




    return (
        <tbody className="text-sm mx-4">
            {
                auditList !== null ? (auditList.map(audit => (
                    <tr key={audit.assessmentId}>
                        <td className="px-2 py-1 sm:py-2">{audit.assessmentId}</td>
                        <td className="px-2 py-1 sm:py-2">{audit.customerBranch === "Service Address" ? ("Main Branch") : (audit.customerBranch)} </td>
                        <td className="px-2 py-1 sm:py-2" id={audit.assessmentId}>{audit.assessmentDate}</td>
                        <td className="px-2 py-1 sm:py-2">{audit.assessedBy1}</td>
                        <td className="px-2 py-1 sm:py-2" >{audit.status}</td>
                        <td className="px-2 py-1 sm:py-2 text-center pr-12" >{audit.totalObservations}</td>
                        <td className="px-2 py-1 sm:py-2 text-center pr-12" >{audit.openObservations}</td>
                        <td className="px-2 py-1 sm:py-2 text-center pr-12" >{audit.closedObservations}</td>
                        <td className="px-2 py-1 sm:py-2 text-center">
                            <button name={audit.assessmentId} onClick={downloadReport}><FcDownload /></button>
                        </td>


                    </tr>

                ))) : (<tr>No data found</tr>)

            }
        </tbody>
    )
}

export default AuditTable;



