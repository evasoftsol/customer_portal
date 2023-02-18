import React, { useState, useEffect, useRef } from 'react'
import { FcDownload } from 'react-icons/fc';
import Axios from 'axios';



const PaymentsTable = ({ paymentList, loading }) => {
    // const [showReschedulePopup, setShowReschedulePopup] = useState({ serviceId: '', visibility: false });
    // const [showRatingPopup, setShowRatingPopup] = useState({ serviceId: '', visibility: false });
    let companyId = localStorage.getItem("companyId");
    if (loading) {
        return <tr><td >Loading....</td></tr>;
    }

    let appid = localStorage.getItem("appId");
    const downloadInvoice = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=Invoice&documentId=" + event.currentTarget.name;

        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                console.log('json', json.pdfUrl);
                window.open(json.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const downloadPaySlip = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=Payment&documentId=" + event.currentTarget.name;

        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                console.log('json', json.pdfUrl);
                window.open(json.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const pay = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/digitalPayment?authCode=" + companyId + "&documentName=Invoice&documentId=" + event.currentTarget.name;

        console.log("pay url=" + url);
        Axios
            .get(url)
            .then((response) => {
                window.open(response.data, '_blank', 'noopener,noreferrer');
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <tbody className="text-sm mx-4">
            {paymentList.map(payment => (
                <tr key={payment.invoiceId}>
                    <td className="px-2 py-2">{payment.invoiceId}</td>
                    <td className="px-2 py-2">{payment.paymentDate}</td>
                    <td className="px-2 py-2 text-right">{payment.paymentAmount}</td>
                    <td className="px-2 py-2">{
                        payment.status === "Created" ?
                            (<button name={payment.invoiceId} onClick={pay} className=" underline underline-offset-1 text-sky-600">Pay</button>) :
                            (payment.status === "Closed" ?
                                (<button name={payment.paymentId} onClick={downloadPaySlip} className=" underline underline-offset-1 text-sky-600">Paid</button>) :
                                (payment.status))

                    }</td>
                    <td className="px-2 py-2"><button name={payment.invoiceId} onClick={downloadInvoice}><FcDownload /></button></td>
                </tr>

            ))}

        </tbody>
    )
}

export default PaymentsTable