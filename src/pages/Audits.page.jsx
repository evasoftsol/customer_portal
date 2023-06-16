import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineExpandMore } from 'react-icons/md';
import { MdOutlineExpandLess } from 'react-icons/md';
import { MdSchedule } from 'react-icons/md'
import { FcCancel } from 'react-icons/fc'
import { TiTick } from 'react-icons/ti'
import { BsPersonCircle } from 'react-icons/bs'

import { FcDownload } from 'react-icons/fc';
import { VscFeedback } from 'react-icons/vsc'
import AuditTable from '../components/AuditTable.component';
// import Pagination from '../components/Pagination';

const Audits = () => {

    // window.addEventListener("popstate", e => {  // Nope, go back to your page
    //     // this.props.history.go(1);
    //     console.log("pop called");
    // });

    const [auditList, setAuditList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);
    const [customDateFilterVisible, setCustomDateFilterVisible] = useState(false);
    const [custInfoPopupVisible, setCustInfoPopupVisible] = useState(false);

    // const [filterData, setFilterDate] = useState({ dateFilter: "btnThisMonth", branchFilter: "--Select--" });
    const datefilterRef = useRef();
    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");
    let companyId = localStorage.getItem("companyId");
    let customerId = localStorage.getItem("customerId");
    let customerName = localStorage.getItem("customerName");

    console.log("currentPage=" + currentPage)
    useEffect(() => {
        console.log("in useEffect");
        getAuditList("", "");
    }, []);

    const getAuditList = (selectedDateFilter, selectedBranch) => {
        console.log("in getAuditList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/fetchAssessmentService?authCode=" + companyId + "&customerId=100000001&customerBranchId=&status=Created&salesPerson&fromDate=01/12/2021&toDate=31/12/2023" + "&apiCallFrom=CustomerPortal";
        let url = "";
        console.log("selectedDateFilter " + selectedDateFilter + "selectedBranch=" + selectedBranch);

        const current = new Date();
        let month = current.getMonth() + 1;
        let fromDate = "";
        let toDate = "";


        if (selectedDateFilter === "btnThisMonth") {
            fromDate = "1/" + month + "/" + current.getFullYear();
            if (month === 12) {
                let year = current.getFullYear() + 1;
                toDate = "1/01/" + year;
            } else {
                month += 1;
                toDate = "1/" + month + "/" + current.getFullYear()
            }
        } else if (selectedDateFilter === "btnLast") {
            toDate = "1/" + month + "/" + current.getFullYear();
            if (month === 1) {
                let year = current.getFullYear() - 1;
                fromDate = "1/12/" + year;
            } else {
                month = month - 1;
                fromDate = "1/" + month + "/" + current.getFullYear();
            }
        } else if (selectedDateFilter === "btnNext") {
            if (month === 12) {
                let year = current.getFullYear() + 1;
                fromDate = "1/01/" + year;
                toDate = "1/02/" + year;
            } else {
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

        } else if (selectedDateFilter === "btnCustomDate") {

            // let selectedMonth = parseInt(document.getElementById('monthSelector').value);
            // let selectedYear = document.getElementById('yearSelector').value;
            // fromDate = "1/" + selectedMonth + "/" + selectedYear;
            // console.log("selectedMonth=" + selectedMonth + "selectedYear=" + selectedYear);
            // if (selectedMonth === 12) {
            //     console.log("selectedMonth === 12")
            //     let year = parseInt(selectedYear) + 1;
            //     toDate = "1/01/" + year;
            // } else {
            //     selectedMonth += 1;
            //     toDate = "1/" + selectedMonth + "/" + selectedYear;
            // }

            let fDate = new Date(document.getElementById("customFromDate").value);
            let tDate = new Date(document.getElementById("customToDate").value);

            let fmonth = fDate.getMonth() + 1;
            let tmonth = tDate.getMonth() + 1;
            fromDate = fDate.getDate() + "/" + fmonth + "/" + fDate.getFullYear();
            let tday = tDate.getDate() + 1;
            toDate = tday + "/" + tmonth + "/" + tDate.getFullYear();
        }
        else {
            console.log("in else part")
            fromDate = "1/" + month + "/" + current.getFullYear();
            if (month === 12) {
                console.log("month === 12")
                let year = current.getFullYear() + 1;
                toDate = "1/01/" + year;
            } else {
                month += 1;
                toDate = "1/" + month + "/" + current.getFullYear();
            }
        }
        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);

        url = "https://" + appid + ".appspot.com/slick_erp/fetchAssessmentService?authCode=" + companyId + "&customerId=" + customerId + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallFrom=CustomerPortal";


        console.log("url=" + url);

        setLoading(true);
        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {

                if ('Failed' in json) {
                    console.log("in if");
                    setAuditList(null);
                    localStorage.setItem("localAuditList", null);
                    console.log("empty response. Audit list set to null");
                    setLoading(false);
                }
                else {
                    localStorage.setItem("localAuditList", JSON.stringify(json));
                    if (selectedBranch !== "" && selectedBranch !== "--select--") {
                        let filteredAuditList = null;
                        const auditListCopy = json;
                        filteredAuditList = auditListCopy.filter(audit => {
                            return audit.customerBranch === selectedBranch;
                        })
                        console.log("filteredAuditList size=" + filteredAuditList.length);
                        setAuditList(filteredAuditList);
                        // setCurrentPage(1);
                        setLoading(false);
                        console.log("filtered result is set to auditlist");
                        setCurrentPage(1);
                    } else {
                        setAuditList(json)
                        setLoading(false)
                        console.log("result is set to auditlist");
                    }
                }
            })
            .catch((error) => {
                setAuditList(null);
                console.log("audit list set to null");
            });
    }


    const applyDateFilter = event => {
        event.preventDefault();

        // alert("Date filter clicked" + event.currentTarget.id );
        if (event.currentTarget.id === "btnCustomDate") {
            let fDate = new Date(document.getElementById("customFromDate").value);
            let tDate = new Date(document.getElementById("customToDate").value);
            console.log("fdate=" + fDate + " tdate=" + tDate);
            console.log("tDate - fDate=" + tDate - fDate);
            let diff = Math.floor((tDate - fDate) / (1000 * 60 * 60 * 24));
            console.log("diff=" + diff);
            if (fDate > tDate) {
                alert("From date should be earlier than todate");
            } else if (diff > 30) {
                alert("Please select from date and to date range within 30 days");
            } else {
                setDateFilterVisible(false);
                setCustomDateFilterVisible(false);
                getAuditList("btnCustomDate", document.getElementById("CustomerBranchDropDown").value);
            }
        } else {
            setDateFilterVisible(false);
            getAuditList(event.currentTarget.id, document.getElementById("CustomerBranchDropDown").value);
        }
    }

    const applyBranchFilter = event => {
        event.preventDefault();
        let selectedbranch = "";
        console.log("selected branch" + event.currentTarget.value);
        if (event.currentTarget.value == "Main Branch") {
            // setFilterDate({ ...filterData, branchFilter: "Service Address" });
            selectedbranch = "Service Address";
        } else {
            // setFilterDate({ ...filterData, branchFilter: event.currentTarget.value });
            selectedbranch = event.currentTarget.value;
        }

        let filteredAuditList = null;
        console.log("selectedbranch=" + selectedbranch + "fetched audit list size=" + auditList.length);
        const auditListCopy = JSON.parse(localStorage.getItem("localAuditList"));
        if (selectedbranch !== "--select--") {
            console.log("in if (selectedbranch !== --Select--)");
            filteredAuditList = auditListCopy.filter(audit => {
                // if (audit.customerBranch === selectedbranch)
                return audit.customerBranch === selectedbranch;
            })
        } else {
            filteredAuditList = auditListCopy;
        }
        console.log("filteredauditList size=" + filteredAuditList.length);
        setAuditList(filteredAuditList);
        setCurrentPage(1);
    }



    // Get current posts

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = null;
    if (auditList) {
        currentPosts = auditList.slice(indexOfFirstPost, indexOfLastPost);
    }


    //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)

        var elements = document.getElementsByTagName('a');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('border-sky-600');
        }
        document.getElementById(pageNumber).classList.add('border-sky-600');
    }

    const showCustomDateFilter = () => {
        setDateFilterVisible(false);
        setCustomDateFilterVisible(true);
    }

    const createItems = () => {
        console.log("in createItems")
        let items = [];
        const branchlist = localStorage.getItem("customerBranchList").split(',');
        // console.log("items=" + branchlist[5])
        for (let i = 0; i < branchlist.length; i++) {
            if (branchlist[i] !== "Main Branch")
                items.push(<option value={branchlist[i]}>{branchlist[i]}</option>);
        }
        return items;
    }
    const expandMore = event => {
        console.log("expandMore clicked with id" + event.currentTarget.id.slice(10));
        let elementid = event.currentTarget.id.slice(10);
        let element = document.getElementById("section" + elementid);
        element.classList.remove('hidden');
        document.getElementById("ExpandLess" + elementid).classList.remove('hidden');
        document.getElementById("ExpandMore" + elementid).classList.add('hidden');
    }
    const expandLess = event => {
        console.log("expandLess clicked with id" + event.currentTarget.id.slice(10));
        let elementid = event.currentTarget.id.slice(10);
        let element = document.getElementById("section" + elementid);
        element.classList.add('hidden');

        document.getElementById("ExpandMore" + elementid).classList.remove('hidden');
        document.getElementById("ExpandLess" + elementid).classList.add('hidden');
    }

    const downloadReportMobileView = event => {
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


    const getcurrentdate = (event) => {
        console.log("getcurrentdate called");
        return "2022-02-20";
    }


    return (
        <>
            <div className='h-5/6 sm:h-5/6 overflow-y-auto '>

                <div className='flex ml-5 sm:ml-10 flex-col sm:flex-row  gap-5 sm:gap-1 sm:justify-between w-11/12 sm:w-11/12 relative my-5'>
                    <div className="font-semibold text-xl hidden sm:inline-flex">Audit List</div>
                    <div className="sm:hidden flex justify-between gap-20 pr-5">
                        <div className="font-semibold text-xl">Audit List</div>
                        <div className="flex pt-1 align-bottom"><button onClick={() => setCustInfoPopupVisible((prev) => !prev)}><BsPersonCircle className='align-bottom text-gray-600' size="20" /></button></div>
                    </div>
                    <div className="flex justify-between sm:justify-start gap-3 pr-5 sm:pr-10">
                        <div>
                            <label htmlFor='CustomerBranchDropDown' className='mr-3 sm:mr-5'>Select Branch :</label>
                            {/* {hidden sm:inline-flex} */}
                            <select id="CustomerBranchDropDown" onChange={applyBranchFilter} className='rounded-lg bg-white border border-gray-300 px-2 mr-5 '>
                                {
                                    createItems()
                                }
                            </select>
                        </div>
                        <button ref={datefilterRef} name="dateFilter" id="dateFilter" onClick={() => setDateFilterVisible((prev) => !prev)}><FiFilter /></button>

                        {dateFilterVisible && (
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div
                                    className="fixed inset-0 w-screen sm:w-full h-full bg-black opacity-25"
                                    onClick={() => setDateFilterVisible(false)}
                                ></div>
                                <div className='flex flex-col gap-2 border p-2 rounded-lg absolute top-24 sm:top-14 right-10 sm:right-5 z-20 shadow-lg border-slate-200 bg-white'>
                                    <button className="bg-white rounded" id="btnThisMonth" onClick={applyDateFilter}>This Month</button>
                                    {/* <button id="btnNext" onClick={applyDateFilter}>Next Month</button> */}
                                    <button id="btnLast" onClick={applyDateFilter}>Last Month</button>
                                    <button id="btnCustom" onClick={showCustomDateFilter}>Custom</button>
                                </div>
                            </div>
                        )}
                        {custInfoPopupVisible && (
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div
                                    className="fixed inset-0 w-screen sm:w-full h-full bg-black opacity-25"
                                    onClick={() => setCustInfoPopupVisible(false)}
                                ></div>
                                <div className='flex flex-col gap-2 border p-2 rounded-lg absolute top-24 sm:top-14 left-2 right-5 z-20 shadow-lg border-slate-200 bg-white text-sm text-[#404042]'>
                                    <div><span className='font-semibold'>ID: </span>{localStorage.getItem("customerId")}</div>
                                    <div><span className='font-semibold'>Name: </span>{localStorage.getItem("customerName")}</div>
                                    <div><span className='font-semibold'>Email: </span> {localStorage.getItem("customerEmail")}</div>
                                    <div><span className='font-semibold'>Cell No </span>: {localStorage.getItem("customerCell")}</div>
                                    <div><span className='font-semibold'>Address: </span> {localStorage.getItem("customerAddress")}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-2 ml-5 sm:ml-10 relative'>

                    {/* =======For tablet or laptop view======== */}
                    <table className="hidden sm:table table-auto border-collapse border-spacing-2 rounded-lg bg-white w-screen sm:w-11/12 overflow-x-auto" >

                        <thead className="bg-red">
                            <tr className="text-left text-[#8181A5] text-sm  ">
                                <th className="py-4 sm:py-8 px-2 align-top">Audit ID</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Branch</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Date</th>
                                <th className="py-4 sm:py-8 px-2 align-top">By</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Status</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Total Observations</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Open Observations</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Closed Observations</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Action</th>

                            </tr>
                        </thead>
                        {(loading ? (<tbody><tr><td><div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                            ></div>
                            <div className="flex justify-center items-center min-h-screen">
                                <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                    <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                                </div>
                            </div>
                        </div></td></tr></tbody>) : (auditList !== null ? (<AuditTable auditList={currentPosts} loading={loading} />) : (<tbody><tr>
                            <td className='text-sm mx-4 text-center text-[#8181A5] font-semibold' colSpan="7">No data found</td></tr></tbody>)))}
                    </table>

                    {/* =======For mobile view======== */}
                    <div className="flex flex-col gap-2 sm:hidden rounded-lg  w-11/12  " >
                        {(loading ? (<div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                            ></div>
                            <div className="flex justify-center items-center min-h-screen">
                                <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                    <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                                </div>
                            </div>
                        </div>) : (currentPosts !== null ? (currentPosts.map(audit => (
                            <div className="flex flex-col gap-1 bg-white rounded-lg">
                                <div className='flex gap-2 justify-between'>
                                    <div className="flex gap-2 justify-start align-top text-left text-[#63636e] text-sm font-semibold ">
                                        <div className=" pl-2 align-top" id={audit.assessmentId}>{audit.assessmentDate}
                                        </div>
                                        <div className="text-left  align-top">{audit.customerBranch}</div>
                                        <div className="text-left  align-top">{audit.status}</div>
                                    </div>
                                    <div>
                                        <button onClick={expandMore} id={"ExpandMore" + audit.assessmentId} ><MdOutlineExpandMore /></button>
                                        <button onClick={expandLess} id={"ExpandLess" + audit.assessmentId} className='hidden' ><MdOutlineExpandLess /></button>
                                    </div>
                                </div>
                                <div id={"section" + audit.assessmentId} className='hidden'>
                                    <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                        <div className=" px-2 align-top"><span className='font-semibold'>Audit Id :</span> {audit.assessmentId}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Branch :</span> {audit.customerBranch === "Service Address" ? ("Main Branch") : (audit.customerBranch)}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Date : </span>{audit.assessmentDate}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>By : </span>{audit.assessedBy1}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Status : </span>{audit.status}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Total Observations. : </span>{audit.totalObservations}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Open Observations :</span> {audit.openObservations}</div>
                                        <div className=" px-2 align-top"><span className='font-semibold'>Closed Observations : </span>{audit.closedObservations}</div>
                                        <div className=" px-2 align-bottom"><span className='font-semibold'>Action :</span>
                                            <button name={audit.assessmentId} onClick={downloadReportMobileView} ><FcDownload /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))) : (<div className='text-sm mx-4 text-center text-[#8181A5] font-semibold bg-white p-1' >No data found</div>)


                        ))}
                    </div>
                    {customDateFilterVisible ? (

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                                onClick={() => setCustomDateFilterVisible(false)}
                            ></div>
                            <div className="flex items-center min-h-screen px-4 py-8">
                                <div className="relative w-full max-w-sm  py-4 mx-auto bg-white rounded-md shadow-lg">
                                    {/* <div className="mt-3 sm:flex"> */}
                                    <div className="mt-2 flex flex-col justify-center align-center">

                                        <div className="flex items-center justify-center gap-1 mt-3  w-full">
                                            <div>
                                                <label htmlFor='customFromDate' className='m-2 p-2 font-semibold'>From date :</label><br />
                                                <input type="date" id="customFromDate" defaultValue={new Date().toISOString().slice(0, 10)} className='m-4 p-2 border-2 w-3/4 rounded-lg' />
                                            </div>
                                            <div>
                                                <label htmlFor='customToDate' className='m-2 p-2 font-semibold'>To date :</label><br />
                                                <input type="date" id="customToDate" defaultValue={new Date().toISOString().slice(0, 10)} className='m-4 p-2 border-2 w-3/4 rounded-lg' />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-5 mt-3  w-full">
                                            <button
                                                className=" mt-2 p-1 w-20 text-white bg-sky-600 text-lg rounded-lg outline-none " id="btnCustomDate"
                                                onClick={applyDateFilter}
                                            >
                                                OK
                                            </button>
                                            <button
                                                className=" mt-2 p-1 w-20 text-white text-lg bg-sky-600  rounded-lg outline-none border "
                                                onClick={() =>
                                                    setCustomDateFilterVisible(false)
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    ) : null}
                </div>
            </div>
            {/* <div className='fixed bottom-0 flex flex-row justify-between align-center gap-2 h-16 bg-white text-[#8181A5] ml-5 sm:ml-10'> */}
            {auditList && (
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={auditList.length}
                    paginate={paginate}
                />)
            }
            {/* </div> */}


        </>
    )
}


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    console.log("in pagination " + postsPerPage + " " + totalPosts)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const catalogNumbers = pageNumbers.length / 5;
    console.log("catalogNumbers=" + catalogNumbers);
    const [currentCatalog, setCurrentCatalog] = useState(1);
    let lastPage = currentCatalog * 5;
    let firstPage = lastPage - 4;
    if (catalogNumbers > 1) {
        console.log("more than one catalog")
    } else {
        console.log("single catalog")
    }
    const showPreviousPages = () => {
        console.log("in showPreviousPages currentCatalog=" + currentCatalog)
        if (currentCatalog > 1) {
            setCurrentCatalog(currentCatalog - 1)
            let pageNumber = (currentCatalog * 5) - 9;
            paginate(pageNumber);
        }
    }

    const showNextPages = () => {
        console.log("in showNextPages currentCatalog=" + currentCatalog + "firstpage=" + firstPage)
        if (currentCatalog < catalogNumbers) {
            setCurrentCatalog(currentCatalog + 1)
            let pageNumber = (currentCatalog * 5) + 1;
            paginate(pageNumber);
        }
    }
    return (
        // className = 'fixed bottom-0 flex flex-row justify-between align-center gap-2 h-16 bg-white text-[#8181A5] ml-5 sm:ml-10'
        <nav className=' flex flex-row gap:1 sm:gap-5 justify-between w-11/12 my-4 ml-5 sm:ml-10 sm:h-1/6'>
            {/* <nav className='absolute bottom-0 sm:bottom-0 flex flex-row gap:1 sm:gap-5 justify-between w-11/12 sm:w-9/12 h-14  sm:ml-10 '> */}
            {catalogNumbers > 1 ? (<button className=" hidden sm:inline-flex px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showPreviousPages}>Prev</button>) : (<div></div>)}
            {catalogNumbers > 1 ? (<button className="sm:hidden px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showPreviousPages}>&lt;</button>) : (<div></div>)}
            <ul className="flex gap-2  w-200 justify-center  ">
                {

                    pageNumbers.map(number => (number >= firstPage && number <= lastPage ?
                        (<li key={number} className=" mt-1">
                            <a onClick={() => paginate(number)} href="#" id={number} className="hover:border-sky-600 border-2 px-1 sm:px-3 py-1 ">
                                {number}
                            </a>
                        </li>) : (<></>)
                    ))
                }
            </ul >
            {catalogNumbers > 1 ? (<button className="hidden sm:inline-flex px-1 sm:px-3 py-2 bg-sky-600 text-white rounded-lg h-fit mr-10" onClick={showNextPages}>Next</button>) : (<div></div>)}
            {catalogNumbers > 1 ? (<button className="sm:hidden px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showNextPages}> &gt;</button>) : (<div></div>)}
        </nav >
    )
}



export default BaseHoc(Audits);
export { Pagination };
