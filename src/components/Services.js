import React from 'react'
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import Axios from 'axios';


const Services = ({ serviceList, loading }) => {
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

    const scheduleService = event => {
        event.preventDefault();
        alert("scheduleService clicked" + event.currentTarget.name);
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
    )
}

export default Services