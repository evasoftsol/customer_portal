import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import ServicesTable from '../components/ServicesTable.component';
// import Pagination from '../components/Pagination';
const ServiceSchedule = () => {

    // window.addEventListener("popstate", e => {  // Nope, go back to your page
    //     // this.props.history.go(1);
    //     console.log("pop called");
    // });

    const [serviceList, setServiceList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);
    const [customDateFilterVisible, setCustomDateFilterVisible] = useState(false);
    // const [filterData, setFilterDate] = useState({ dateFilter: "btnThisMonth", branchFilter: "--Select--" });
    const datefilterRef = useRef();
    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");

    console.log("currentPage=" + currentPage)
    useEffect(() => {
        console.log("in useEffect");
        getServiceList("", "");
    }, []);

    const getServiceList = (selectedDateFilter, selectedBranch) => {
        console.log("in getServiceList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=1/12/2017&toDate=3/12/2017&apiCallFrom=CustomerPortal";
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
        url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallFrom=CustomerPortal";


        console.log("url=" + url);

        setLoading(true);
        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {

                if (json.length === 0) {
                    setServiceList(null);
                    localStorage.setItem("localServiceList", null);
                    console.log("empty response. service list set to null");
                    setLoading(false);
                } else {
                    localStorage.setItem("localServiceList", JSON.stringify(json));
                    if (selectedBranch !== "" && selectedBranch !== "--select--") {
                        let filteredServiceList = null;
                        const serviceListCopy = json;
                        filteredServiceList = serviceListCopy.filter(service => {
                            return service.serviceBranch === selectedBranch;
                        })
                        console.log("filteredServiceList size=" + filteredServiceList.length);
                        setServiceList(filteredServiceList);
                        setLoading(false);
                        console.log("filtered result is set to servicelist");
                    } else {
                        setServiceList(json)
                        setLoading(false)
                        console.log("result is set to servicelist");
                    }
                }
            })
            .catch((error) => {
                setServiceList(null);
                console.log("service list set to null");
            });

    }


    const applyDateFilter = event => {
        event.preventDefault();

        // alert("Date filter clicked" + event.currentTarget.id );
        if (event.currentTarget.id === "btnCustomDate") {
            setDateFilterVisible(false);
            setCustomDateFilterVisible(false);
            getServiceList("btnCustomDate", document.getElementById("CustomerBranchDropDown").value);
        } else {
            setDateFilterVisible(false);
            getServiceList(event.currentTarget.id, document.getElementById("CustomerBranchDropDown").value);
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
        // getServiceList();

        let filteredServiceList = null;
        console.log("selectedbranch=" + selectedbranch + "fetched service list size=" + serviceList.length);
        const serviceListCopy = JSON.parse(localStorage.getItem("localServiceList"));
        if (selectedbranch !== "--select--") {
            console.log("in if (selectedbranch !== --Select--)");
            filteredServiceList = serviceListCopy.filter(service => {
                // if (service.serviceBranch === selectedbranch)
                return service.serviceBranch === selectedbranch;
            })
        } else {
            filteredServiceList = serviceListCopy;
        }
        console.log("filteredServiceList size=" + filteredServiceList.length);
        setServiceList(filteredServiceList);
    }




    // Get current posts

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = null;
    if (serviceList) {
        currentPosts = serviceList.slice(indexOfFirstPost, indexOfLastPost);
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
            items.push(<option value={branchlist[i]}>{branchlist[i]}</option>);
        }
        return items;
    }
    return (
        <>
            <div className='flex ml-5 sm:ml-10 sm:flex-row flex-col gap-2 justify-between mb-3 w-11/12 relative my-5'>
                <div className="font-semibold text-xl">Service Schedule</div>
                <div className="flex gap-3">
                    <label htmlFor='CustomerBranchDropDown' className='hidden sm:inline-flex'>Select Branch :</label>
                    <select id="CustomerBranchDropDown" onChange={applyBranchFilter} className='rounded-lg bg-white border border-gray-300 px-2'>
                        {
                            createItems()
                        }
                    </select>
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
            </div>
            <div className='flex flex-col gap-2 ml-5 sm:ml-10'>

                <table className="table-auto border-collapse border-spacing-2 rounded-lg bg-white w-11/12 " >

                    <thead className="bg-red">
                        <tr className="text-left text-[#8181A5] text-sm  ">
                            <th className="py-4 sm:py-8 px-2">Service ID</th>
                            <th className="py-4 sm:py-8 px-2">Service Branch</th>
                            <th className="py-4 sm:py-8 px-2">Date</th>
                            <th className="py-4 sm:py-8 px-2">Name</th>
                            <th className="py-4 sm:py-8 px-2">Status</th>
                            <th className="py-4 sm:py-8 px-2">Action</th>
                            <th className="py-4 sm:py-8 px-2">Rating</th>
                        </tr>
                    </thead>
                    {/* {serviceList ? (<ServicesTable serviceList={currentPosts} loading={loading} />) :  */}
                    {(loading ? (<tbody><tr><div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                        ></div>
                        <div className="flex justify-center items-center min-h-screen">
                            <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                            </div>
                        </div>
                    </div></tr></tbody>) : (serviceList !== null ? (<ServicesTable serviceList={currentPosts} loading={loading} />) : (<tbody><tr><td className='text-sm mx-4'>No data found</td></tr></tbody>)))}
                </table>
                {serviceList && (
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={serviceList.length}
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
                                            <option value="2026">2027</option>
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
    console.log("catalogNumbers=" + catalogNumbers);
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
        <nav className='flex flex-row gap:1 sm:gap-5 justify-between w-11/12'>
            {catalogNumbers > 1 ? (<button className="px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showPreviousPages}>Prev</button>) : (<div></div>)}
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
            {catalogNumbers > 1 ? (<button className="px-1 sm:px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showNextPages}>Next</button>) : (<div></div>)}

        </nav >
    )
}



export default BaseHoc(ServiceSchedule);
export { Pagination };
