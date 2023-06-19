
import React, { useState, useEffect, useRef } from 'react'
import { FcDownload } from 'react-icons/fc';
import { MdAutorenew } from 'react-icons/md'
import Axios from 'axios';



const RenewalsTable = ({ contractList, loading }) => {
    // const [showReschedulePopup, setShowReschedulePopup] = useState({ serviceId: '', visibility: false });
    // const [showRatingPopup, setShowRatingPopup] = useState({ serviceId: '', visibility: false });
    let companyId = localStorage.getItem("companyId");
    let isPaymentGatewayEnabled = localStorage.getItem("isPaymentGatewayEnabled");
    if (loading) {
        return <tr><td >Loading....</td></tr>;
    }

    let appid = localStorage.getItem("appId");
    const downloadContract = event => {
        event.preventDefault();
        let url = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=ContractRenewal&documentId=" + event.currentTarget.name;

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
        let url = "https://" + appid + ".appspot.com/slick_erp/digitalPayment?authCode=" + companyId + "&documentName=Contract%20Renew&documentId=" + event.currentTarget.name;

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
    const getProductList = (prodList) => {

        // let productArr = JSON.parse(prodList);

        // let productNameList = productArr.map(product => {
        //     return product.serviceProduct.productName
        // })
        let productNameList = prodList.map(product => {
            return product.productName
        })

        console.log(productNameList);
        return productNameList;
    }
    return (
        <tbody className="text-sm mx-4">
            {

                contractList.map(contract => (
                    <tr key={contract.contractId}>
                        <td className="px-2 py-2 align-top ">{contract.contractId}</td>
                        <td className="px-2 py-2 align-top">
                            <>
                                {
                                    getProductList(contract.productList).map(p => {
                                        return <p>{p}</p>;
                                    })
                                    // "TestProduct"
                                }

                            </>
                        </td>
                        <td className="px-2 py-2 align-top text-center">{contract.contractStartDate}</td>
                        <td className="px-2 py-2 align-top text-center">{contract.contractEndDate}</td>
                        <td className="px-2 py-2 pr-12 align-top text-right">{contract.netPayable}</td>
                        <td className="px-4 py-2 align-top text-center "><button name={contract.contractId} onClick={downloadContract}><FcDownload /></button></td>
                        {isPaymentGatewayEnabled === "yes" ? (<td className="px-4 py-2 align-top "><button name={contract.contractId} onClick={renewContract}><MdAutorenew /></button></td>) : null}
                    </tr>

                ))}

        </tbody>
    )
}

export default RenewalsTable