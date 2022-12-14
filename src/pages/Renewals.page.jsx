import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import ContractsTable from '../components/ContractsTable.component';


const Renewals = () => {

    const [contractList, setContractList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);
    const [customDateFilterVisible, setCustomDateFilterVisible] = useState(false);
    const datefilterRef = useRef();
    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");
    let companyId = localStorage.getItem("companyId");

    console.log("currentPage=" + currentPage)
    useEffect(() => {
        console.log("in useEffect");
        getContractList("btnThisMonth");
    }, []);

    const getContractList = (param) => {
        console.log("in getContractList");
        // let url = "http://my.evadev0006.appspot.com/slick_erp/analyticsOperations?loadType=Contract&authCode=5659313586569216&customerCellNo=9004245917&customerEmail=evasoftwaresolutionsdevelop@gmail.com&fromDate=1/10/2023&toDate=31/12/2023&apiCallFrom=CustomerPortal&actiontask=ContractRenewal";
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

        } else if (param === "btnCustomDate") {

            let selectedMonth = parseInt(document.getElementById('monthSelector').value);
            let selectedYear = document.getElementById('yearSelector').value;
            fromDate = "1/" + selectedMonth + "/" + selectedYear;
            console.log("selectedMonth=" + selectedMonth + "selectedYear=" + selectedYear);
            if (selectedMonth === 12) {
                console.log("selectedMonth === 12")
                let year = parseInt(selectedYear) + 1;
                toDate = "1/01/" + year;
            } else {
                selectedMonth += 1;
                toDate = "1/" + selectedMonth + "/" + selectedYear;
            }
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
        url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Contract&authCode=" + companyId + "&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallFrom=CustomerPortal&actiontask=ContractRenewal";


        console.log("url=" + url);

        setLoading(true);
        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                if ('Message' in json[0]) {  //response [{"Message":"No Data found"}] 
                    // alert("message" + json[0].Message)
                    setContractList(null);
                    setLoading(false);
                } else {
                    setContractList(json)
                    console.log("result is set to ContractList");
                    setLoading(false);
                }
            })
            .catch((error) => {
                setContractList(null);
                console.log("ContractList set to null");
            });

    }




    const applyDateFilter = event => {
        event.preventDefault();

        // alert("Date filter clicked" + event.currentTarget.id );
        if (event.currentTarget.id === "btnCustomDate") {
            setDateFilterVisible(false);
            setCustomDateFilterVisible(false);
            getContractList(event.currentTarget.id);
        } else {
            setDateFilterVisible(false);
            getContractList(event.currentTarget.id);
        }
    }


    // if (!contractList) return (<div>Loading......</div>)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = null;
    if (contractList) {
        currentPosts = contractList.slice(indexOfFirstPost, indexOfLastPost);
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

    return (
        <>
            <div className='flex ml-10 flex-row gap-20 justify-start sm:justify-between mb-3 w-11/12 relative my-5'>
                <div className="font-semibold text-xl">Renewals</div>
                <button ref={datefilterRef} name="dateFilter" id="dateFilter" onClick={() => setDateFilterVisible((prev) => !prev)}><FiFilter /></button>

                {dateFilterVisible && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-25"
                            onClick={() => setDateFilterVisible(false)}
                        ></div>
                        <div className='flex flex-col gap-2 border p-2 rounded-lg absolute top-14 right-1 z-20 shadow-lg border-slate-200 bg-white'>
                            <button className="bg-white rounded" id="btnThisMonth" onClick={applyDateFilter}>This Month</button>
                            <button id="btnNext" onClick={applyDateFilter}>Next Month</button>
                            <button id="btnLast" onClick={applyDateFilter}>Last Month</button>
                            <button id="btnCustom" onClick={showCustomDateFilter}>Custom</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 ml-10'>

                <table className="table-auto border-collapse border-spacing-2 rounded-lg bg-white w-11/12 " >

                    <thead className="bg-red">
                        <tr className="text-left text-[#8181A5] text-sm  ">
                            <th className="py-8 px-2 align-top">Contract ID</th>
                            <th className="py-8 px-2 align-top">Product</th>
                            <th className="py-8 px-2 align-top">Start Date</th>
                            <th className="py-8 px-2 align-top">End Date</th>
                            <th className="py-8 px-2 align-top">Amount</th>
                            <th className="py-8 px-2 align-top">Print</th>
                            <th className="py-8 px-2 align-top">Renew</th>
                        </tr>
                    </thead>
                    {/* {contractList ? (<ContractsTable contractList={currentPosts} loading={loading} />) : (loading ? (<tbody><tr><div>Loading......</div></tr></tbody>) : (null))} */}
                    {(loading ? (<tbody><tr><div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                        ></div>
                        <div className="flex justify-center items-center min-h-screen">
                            <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                            </div>
                        </div>
                    </div></tr></tbody>) : (contractList !== null ? (<ContractsTable contractList={currentPosts} loading={loading} />) : (<tbody><tr><td className='text-sm mx-4 text-center text-[#8181A5] font-semibold' colSpan="7">No data found</td></tr></tbody>)))}
                </table>
                {contractList && (
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={contractList.length}
                        paginate={paginate}
                    />)
                }
                {customDateFilterVisible ? (

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setCustomDateFilterVisible(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-xs py-4 mx-auto bg-white rounded-md shadow-lg">
                                {/* <div className="mt-3 sm:flex"> */}
                                <div className="mt-2 flex flex-col justify-center align-center">
                                    <h2 className="text-md mb-4 font-semibold text-center">Select Month and Year </h2>

                                    {/* <div>
                                            <label htmlFor='customDate' className='my-2  text-md font-semibold'>Select Month :</label><br />
                                            <input type="date" id="customDate" className='my-2 p-2 border-2 w-3/4 rounded' />
                                        </div> */}
                                    <div className='flex my-2 justify-center'>
                                        {/* <label htmlFor='monthSelector' className='my-2  text-md font-semibold'>Month :</label> */}
                                        <select id='monthSelector' className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>Month
                                            <option value="1">Jan</option>
                                            <option value="2">Feb</option>
                                            <option value="3">Mar</option>
                                            <option value="4">Apr</option>
                                            <option value="5">May</option>
                                            <option value="6">Jun</option>
                                            <option value="7">Jul</option>
                                            <option value="8">Aug</option>
                                            <option value="9">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </select>
                                        {/* <label htmlFor='yearSelector' className='my-2  text-md font-semibold'>Year :</label> */}
                                        <select id='yearSelector' className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>Year
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                        </select>

                                    </div>

                                    <div className="items-center justify-center gap-5 mt-3 flex w-full">
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
    const [currentCatalog, setCurrentCatalog] = useState(1);
    let lastPage = currentCatalog * 5;
    let firstPage = lastPage - 4;
    const showPreviousPages = () => {
        console.log("in showPreviousPages currentCatalog=" + currentCatalog)
        if (currentCatalog > 1) {
            setCurrentCatalog(currentCatalog - 1)
        }
    }

    const showNextPages = () => {
        console.log("in showNextPages currentCatalog=" + currentCatalog)
        if (currentCatalog < catalogNumbers) {
            setCurrentCatalog(currentCatalog + 1)
            paginate(firstPage)
        }
    }
    return (
        <nav className='flex flex-row gap-5 justify-between w-11/12'>
            {catalogNumbers > 1 ? (<button className="px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showPreviousPages}>Prev</button>) : (<div></div>)}
            <ul className="flex gap-2  w-200 justify-center  ">
                {

                    pageNumbers.map(number => (number >= firstPage && number <= lastPage ?
                        (<li key={number} className=" mt-1">
                            <a onClick={() => paginate(number)} href="#" id={number} className="hover:border-sky-600 border-2 px-3 py-1 ">
                                {number}
                            </a>
                        </li>) : (<></>)
                    ))
                }
            </ul >
            {catalogNumbers > 1 ? (<button className="px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showNextPages}>Next</button>) : (<div></div>)}

        </nav >
    )
}


export default BaseHoc(Renewals);
export { Pagination };