
import React, { useState, useEffect, useRef } from 'react'
import { FcDownload } from 'react-icons/fc';
import { MdAutorenew } from 'react-icons/md'
import Axios from 'axios';



const ContractsTable = ({ contractList, loading }) => {
    // const [showReschedulePopup, setShowReschedulePopup] = useState({ serviceId: '', visibility: false });
    // const [showRatingPopup, setShowRatingPopup] = useState({ serviceId: '', visibility: false });

    if (loading) {
        return <tr><td >Loading....</td></tr>;
    }

    let appid = localStorage.getItem("appId");
    const downloadContract = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=5659313586569216&documentName=Contract&documentId=" + event.currentTarget.name;

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
    const renewContract = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/digitalPayment?authCode=5659313586569216&documentName=Contract%20Renew&documentId=" + event.currentTarget.name;

        console.log("renewal url=" + url);
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
            {

                contractList.map(contract => (
                    <tr key={contract.contractId}>
                        <td className="px-2 py-2">{contract.contractId}</td>
                        <td className="px-2 py-2">{

                            "product"
                        }</td>
                        <td className="px-2 py-2">{contract.contrctStartDate}</td>
                        <td className="px-2 py-2">{contract.contractEndDate}</td>
                        <td className="px-2 py-2">{contract.netPayable}</td>
                        <td className="px-2 py-2"><button name={contract.contractId} onClick={downloadContract}><FcDownload /></button></td>
                        <td className="px-2 py-2"><button name={contract.contractId} onClick={renewContract}><MdAutorenew /></button></td>
                    </tr>

                ))}

        </tbody>
    )
}

export default ContractsTable