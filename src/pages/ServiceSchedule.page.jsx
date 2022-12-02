import React, { useState, useEffect, useRef } from 'react'
import BaseHoc from '../hoc/BaseHoc'
import Axios from 'axios';
import { FcDownload } from 'react-icons/fc';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import Services from '../components/Services';
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
    const datefilterRef = useRef();
    let appid = localStorage.getItem("appId");
    let customerCell = localStorage.getItem("customerCell");
    let customerEmail = localStorage.getItem("customerEmail");

    console.log("currentPage=" + currentPage)
    useEffect(() => {
        console.log("in useEffect");
        getServiceList("btnThisMonth");
        // const closeDateFilter = e => {
        //     console.log("in closeDateFilter" + e.currentTarget.name);
        //     // if (e.path[0] != datefilterRef.current) {
        //     setDateFilterVisible(false);
        //     // }
        // }
        // document.body.addEventListener('click', closeDateFilter);
        // return () => document.body.removeEventListener('click', closeDateFilter);
    }, []);

    const getServiceList = (param) => {
        console.log("in getServiceList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=2/12/2022&toDate=3/12/2022&apiCallfrom=CustomerPortal";
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

        } else if (param === "btnCustomDate") {
            // let selectedDate = new Date(document.getElementById("customDate").value);
            // month = selectedDate.getMonth() + 1;
            // fromDate = "1/" + selectedMonth + "/" + selectedDate.getFullYear();
            // if (month === 12) {
            //     let year = selectedDate.getFullYear() + 1;
            //     toDate = "1/01/" + year;
            // } else {
            //     month += 1;
            //     toDate = "1/" + month + "/" + selectedDate.getFullYear();
            // }
            let selectedMonth = document.getElementById('monthSelector').value;
            let selectedYear = document.getElementById('yearSelector').value;
            fromDate = "1/" + selectedMonth + "/" + selectedYear;
            if (month === 12) {
                let year = parseInt(selectedYear) + 1;
                toDate = "1/01/" + year;
            } else {
                month += 1;
                toDate = "1/" + month + "/" + selectedYear;
            }
        }
        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);
        url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallfrom=CustomerPortal";


        console.log("url=" + url);

        setLoading(true);
        Axios
            .get(url)
            .then((response) => response.data)
            .then((json) => {
                setServiceList(json)
                console.log("result is set to servicelist");
                setLoading(false);

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

        // alert("Date filter clicked" + event.currentTarget.id );
        if (event.currentTarget.id === "btnCustomDate") {
            setDateFilterVisible(false);
            setCustomDateFilterVisible(false);
            getServiceList(event.currentTarget.id);
        } else {
            setDateFilterVisible(false);
            getServiceList(event.currentTarget.id);
        }
    }


    if (!serviceList) return (<div>Loading......</div>)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = serviceList.slice(indexOfFirstPost, indexOfLastPost);


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
            <div className='flex ml-10 flex-row justify-between mb-3 w-11/12 relative my-5'>
                <div className="font-semibold text-xl">Service Schedule</div>
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
            <div className='flex flex-col gap-2 w-full h-full ml-10'>

                <table className="table-auto border-collapse border-spacing-2 rounded-lg bg-white w-11/12 " >

                    <thead className="bg-red">
                        <tr className="text-left text-[#8181A5] text-sm  ">
                            <th className="py-8 px-2">Service ID</th>
                            <th className="py-8 px-2">Service Branch</th>
                            <th className="py-8 px-2">Date</th>
                            <th className="py-8 px-2">Name</th>
                            <th className="py-8 px-2">Status</th>
                            <th className="py-8 px-2">Action</th>
                            <th className="py-8 px-2">Rating</th>
                        </tr>
                    </thead>
                    <Services serviceList={currentPosts} loading={loading} />
                </table>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={serviceList.length}
                    paginate={paginate}
                />
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
            <button className="px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showPreviousPages}>Prev</button>
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
            <button className="px-3 py-2 bg-sky-600 text-white rounded-lg" onClick={showNextPages}>Next</button>
        </nav >
    )
}



export default BaseHoc(ServiceSchedule);
export { Pagination };
