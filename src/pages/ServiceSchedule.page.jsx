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




import ServicesTable from '../components/ServicesTable.component';
// import Pagination from '../components/Pagination';
const ServiceSchedule = () => {

    // window.addEventListener("popstate", e => {  // Nope, go back to your page
    //     // this.props.history.go(1);
    //     console.log("pop called");
    // });

    const [serviceList, setServiceList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [dateFilterVisible, setDateFilterVisible] = useState(false);
    const [customDateFilterVisible, setCustomDateFilterVisible] = useState(false);
    const [custInfoPopupVisible, setCustInfoPopupVisible] = useState(false);
    const [showReschedulePopupMobileView, setShowReschedulePopupMobileView] = useState({ serviceId: '', visibility: false });
    const [showRatingPopupMobileView, setShowRatingPopupMobileView] = useState({ serviceId: '', visibility: false });
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

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
        getServiceList("", "");
    }, []);

    const getServiceList = (selectedDateFilter, selectedBranch) => {
        console.log("in getServiceList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=" + companyId + "&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=1/12/2022&toDate=6/12/2022&apiCallFrom=CustomerPortal";
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
            // fromDate = "1/" + month + "/" + current.getFullYear();
            // if (month === 12) {
            //     console.log("month === 12")
            //     let year = current.getFullYear() + 1;
            //     toDate = "1/01/" + year;
            // } else {
            //     month += 1;
            //     toDate = "1/" + month + "/" + current.getFullYear();
            // }
           
            fromDate=current.getDate()+"/"+month+"/"+current.getFullYear(); //changed on 3-10-2024 as out of memory error comes in erp if services are more in number for a month
            if(month===1 || month===3 ||month===5 ||month===7 ||month===8 ||month===11 ||month===12){
                if(current.getDate()<31)
                    let d=current.getDate()+1;
                    toDate =d+"/"+month+"/"+current.getFullYear();
                }else{
                    let m=month+1;
                    let y=current.getFullYear();
                    if(month===13){
                        m=1;
                        y=current.getFullYear()+1;
                    }
                     toDate ="1/"+m+"/"+y;
                }                    
            }else if(month===4 || month===6 ||month===9 ||month===11){
                if(current.getDate()<30)
                    let d=current.getDate()+1;
                    toDate =d+"/"+month+"/"+current.getFullYear();
                }else{
                    let m=month+1;       
                    toDate ="1/"+m+"/"+current.getFullYear();  
                }    
            }else{
                if(current.getDate()<28)
                    let d=current.getDate()+1;
                    toDate =d+"/"+month+"/"+current.getFullYear();
                }else{
                    let m=month+1;       
                    toDate ="1/"+m+"/"+current.getFullYear();  
                }  
              }
        
            toDate =current.getDate()+"/"+month+"/"+current.getFullYear();     //changed on 3-10-2024 as out of memory error comes in erp if services are more in number for a month   
        }
        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);
        if (fromDate !== "" && toDate !== "") {
            url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=" + companyId + "&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallFrom=CustomerPortal";


            console.log("url=" + url);

            setLoading(true);
            Axios
                .get(url)
                .then((response) => response.data)
                .then((json) => {


                    if ('Message' in json[0]) {//if (json.length === 0) {
                        console.log("in if");
                        setServiceList(null);
                        localStorage.setItem("localServiceList", null);
                        console.log("empty response. service list set to null");
                        setLoading(false);
                    }
                    else {
                        localStorage.setItem("localServiceList", JSON.stringify(json));
                        if (selectedBranch !== "" && selectedBranch !== "--select--") {
                            let filteredServiceList = null;
                            const serviceListCopy = json;
                            if (selectedBranch === "Main Branch")
                                selectedBranch = "Service Address"
                            filteredServiceList = serviceListCopy.filter(service => {
                                return service.serviceBranch === selectedBranch;
                            })
                            console.log("filteredServiceList size=" + filteredServiceList.length);
                            setServiceList(filteredServiceList);
                            // setCurrentPage(1);
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
    }


    const applyDateFilter = event => {
        event.preventDefault();
        // alert("Date filter clicked" + event.currentTarget.id);
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
                getServiceList("btnCustomDate", document.getElementById("CustomerBranchDropDown").value);
            }
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
        setCurrentPage(1);
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

    const downloadSRMobileView = event => {
        event.preventDefault();
        let srcopyurl = "https://" + appid + ".appspot.com/slick_erp/pdflinkurl?authCode=" + companyId + "&documentName=Service&documentId=" + event.currentTarget.name;

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
    let selectedServiceId = "";
    const scheduleService = event => {
        event.preventDefault();
        // alert("scheduleService clicked" + event.currentTarget.name);
        selectedServiceId = event.currentTarget.name;
        setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: selectedServiceId, visibility: true });
    }

    const reschedule = (event) => {
        event.preventDefault();
        if (processing) {
            alert("Wait");
            return;
        }
        let rDate = document.getElementById("rescheduleDate").value;

        // let rTime = document.getElementById("rescheduleTime").value;
        let rReason = document.getElementById("rescheduleReason").value;
        // console.log("scheduleService date=" + rDate + " time=" + rTime + " reason=" + rReason + " service id=" + showReschedulePopupMobileView.serviceId);
        if (rDate == "") {
            alert("Select date")
            // } else if (rTime == "") {
            //     alert("Select time")
        }
        // else if (rReason == "") {
        //     alert("Give reason")
        // }
        else {
            // http://my.evadev0006.appspot.com/slick_erp/rescheduleServiceDataUpload?authCode=5659313586569216&apiCallFrom=CustomerPortal&serviceId=600001244&rescheduleDate=20-1-2021&rescheduleTime=20:05&rescheduleReason=reason

            let selectedDate = new Date(rDate);
            const currentDate = new Date();
            // console.log("selected day" + selectedDate.getDate() + " month=" + selectedDate.getMonth() + " year=" + selectedDate.getFullYear() + " " + selectedDate.getTime());
            // console.log("current day" + currentDate.getDate() + " month=" + currentDate.getMonth() + " year=" + currentDate.getFullYear() + " " + currentDate.getTime());

            // selectedDate.setHours(rTime.split(':')[0]);
            // selectedDate.setMinutes(rTime.split(':')[1]);

            let hours = parseInt(document.getElementById('hourSelector').value);
            let mins = parseInt(document.getElementById('minuteSelector').value);
            let ampm = document.getElementById('ampmSelector').value;
            let minstring = document.getElementById('minuteSelector').value;
            if (hours !== 0 && minstring !== "0" && ampm !== "0") {
                if (ampm === "AM" && hours === "12") {
                    hours = 0;
                }
                if (ampm === "PM") {
                    if (hours != 12) {
                        hours = hours + 12;
                    }
                }
                selectedDate.setHours(hours);
                selectedDate.setMinutes(mins);
                let rTime = "";
                if (hours < 10) {
                    rTime += "0" + hours;
                } else {
                    rTime += hours;
                }
                if (mins < 10) {
                    rTime += ":0" + mins;
                } else {
                    rTime += ":" + mins;
                }

                console.log("selected time=" + selectedDate.getTime());
                // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                // let formatedDateString = selectedDate.getDate() + "-" + monthNames[selectedDate.getMonth()] + "-" + selectedDate.getFullYear();
                let month = selectedDate.getMonth() + 1;
                let formatedDateString = selectedDate.getDate() + "-" + month + "-" + selectedDate.getFullYear();
                if (selectedDate < currentDate)
                    alert("You cannot schedule a service for past date or time");
                else {
                    setProcessing(true);
                    let url = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/rescheduleServiceDataUpload?authCode=" + companyId + "&apiCallFrom=CustomerPortal&serviceId=" + showReschedulePopupMobileView.serviceId + "&rescheduleDate=" + formatedDateString + "&rescheduleTime=" + rTime + "&rescheduleReason=" + rReason;
                    console.log(url);

                    Axios
                        .get(url)
                        .then((response) => response.data)
                        .then((json) => {

                            console.log('response.data', json);
                            if ('message' in json) {
                                if (json.message === "Success") {
                                    setProcessing(false);
                                    alert("Service has been rescheduled successfully!")

                                    const updatedServiceList = serviceList.filter(service => {
                                        if (service.serviceId == showReschedulePopupMobileView.serviceId) {
                                            service.serviceDate = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                                            service.status = "Rescheduled"
                                            return service;
                                        } else {
                                            return service;
                                        }
                                    })
                                    setServiceList(updatedServiceList);
                                    // serviceList = updatedServiceList;
                                    const element = document.getElementById(showReschedulePopupMobileView.serviceId);
                                    element.innerHTML = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                                    element.nextSibling.nextSibling.innerHTML = "Rescheduled";
                                    setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });

                                }
                                else {
                                    setProcessing(false);
                                    alert(json.message)
                                    setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                                }
                            } else {
                                setProcessing(false);
                                alert("Failed to reschedule service!")
                            }
                            setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                        })
                        .catch((error) => {
                            setProcessing(false);
                            alert(error);
                            setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                        });
                }

            } else {
                if (hours === 0 && minstring === "0" && ampm === "0") {
                    selectedDate.setHours(23);
                    selectedDate.setMinutes(59);
                    let month = selectedDate.getMonth() + 1;
                    let formatedDateString = selectedDate.getDate() + "-" + month + "-" + selectedDate.getFullYear();
                    if (selectedDate < currentDate)
                        alert("You cannot schedule a service for past date or time");
                    else {
                        setProcessing(true);
                        let url = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/rescheduleServiceDataUpload?authCode=" + companyId + "&apiCallFrom=CustomerPortal&serviceId=" + showReschedulePopupMobileView.serviceId + "&rescheduleDate=" + formatedDateString + "&rescheduleTime=Flexible&rescheduleReason=" + rReason;
                        console.log(url);

                        Axios
                            .get(url)
                            .then((response) => response.data)
                            .then((json) => {

                                console.log('response.data', json);
                                if ('message' in json) {
                                    if (json.message === "Success") {
                                        setProcessing(false);
                                        alert("Service has been rescheduled successfully!")

                                        const updatedServiceList = serviceList.filter(service => {
                                            if (service.serviceId == showReschedulePopupMobileView.serviceId) {
                                                service.serviceDate = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                                                service.status = "Rescheduled"
                                                return service;
                                            } else {
                                                return service;
                                            }
                                        })
                                        setServiceList(updatedServiceList);
                                        // serviceList = updatedServiceList;
                                        const element = document.getElementById(showReschedulePopupMobileView.serviceId);
                                        element.innerHTML = selectedDate.getDate() + "/" + month + "/" + selectedDate.getFullYear();
                                        element.nextSibling.nextSibling.innerHTML = "Rescheduled";
                                        setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                                    }
                                    else {
                                        setProcessing(false);
                                        alert(json.message)
                                        setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                                    }
                                } else {
                                    setProcessing(false);
                                    alert("Failed to reschedule service!")
                                }
                                setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                            })
                            .catch((error) => {
                                setProcessing(false);
                                alert(error);
                                setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false });
                            });
                    }

                } else {
                    console.log("condition 3");
                    console.log("hours in else=" + hours);
                    if (hours === 0) {
                        alert("Select hour in time");
                        return;
                    }
                    if (minstring === "0") {
                        alert("Select minutes in time");
                        return;
                    }
                    if (ampm === "0") {
                        alert("Select ampm in time");
                        return;
                    }
                }
            }
        }


    }

    const getcurrentdate = (event) => {
        console.log("getcurrentdate called");
        return "2022-02-20";
    }

    //Feedback related methods
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    const submitFeedback = event => {
        event.preventDefault();
        if (processing) {
            alert("wait");
            return;
        }
        if (currentValue == 0) {
            alert("Give stars");
            return;
        }

        let remark = document.getElementById("customerFeedback").value;
        if (currentValue < 3) {
            if (remark == "") {
                alert("Enter remark");
                return;
            }
        }
        if (remark !== null && remark.includes("&")) {
            alert("Remove & ");
            return;
        }
        if (remark !== null && remark.includes("\"")) {
            alert("Remove \" ");
            return;
        }
        setProcessing(true);
        console.log("processing");
        let rating = currentValue * 2;
        const url = "https://" + localStorage.getItem("appId") + ".appspot.com/slick_erp/serviceschedulingbycustomer?action=Customer%20Support&serviceId=" + showRatingPopupMobileView.serviceId + "&ratings=" + rating + "&range=5&remark=" + remark + "&apiCallFrom=CustomerPortal";
        let serviceObj = null;
        Axios.get(url).then(
            (response) => {
                console.log("response=" + response.status + " " + response.statusText)
                if (response.status === 200) {
                    // alert("Feedback submitted successfully!");
                    const updatedServiceList = currentPosts.filter(service => {
                        if (service.serviceId == showRatingPopupMobileView.serviceId) {
                            if (currentValue === 1)
                                service.customerFeedback = "Poor";
                            else if (currentValue === 2)
                                service.customerFeedback = "Average";
                            else if (currentValue === 3)
                                service.customerFeedback = "Good";
                            else if (currentValue === 4)
                                service.customerFeedback = "Very Good";
                            else if (currentValue === 5)
                                service.customerFeedback = "Excellent";
                            serviceObj = service;
                            console.log("serviceObj=" + serviceObj);
                            return service;
                        } else {
                            return service;
                        }
                    })
                    currentPosts = updatedServiceList;

                    if (currentValue < 3) {

                        let dueDate = new Date();
                        dueDate.setDate(dueDate.getDate() + 2);
                        let month = dueDate.getMonth() + 1;
                        let dateString = dueDate.getDate() + "-" + month + "-" + dueDate.getFullYear();


                        let data = '{"screenName":"createComplain","authCode":"' + companyId + '","apiCallFrom":"CustomerPortal","serviceId":"' + showRatingPopupMobileView.serviceId + '","customerId":"' + customerId + '","description":"' + remark + '","personResponsible":"","branch":"' + serviceObj.branch + '","assignTo":"","dueDate":"' + dateString + '","callerName":"' + customerName + '","callerNo":"' + customerCell + '","callerEmail":"' + customerEmail + '","category":"","productId":"' + serviceObj.productId + '","productName":"' + serviceObj.productName + '","customerBranch":"' + serviceObj.serviceBranch + '","contractId":"' + serviceObj.contractId + '"}';


                        let url = "https://" + appid + ".appspot.com/slick_erp/anylaticsDataCreation?data=" + data;

                        console.log(url);
                        Axios
                            .get(url)
                            .then((response) => {
                                setProcessing(false);
                                console.log("stopped processing");
                                alert("We have received your complaint " + response.data + ". We will get back to you shortly.");
                                setShowRatingPopupMobileView({ ...showRatingPopupMobileView, serviceId: "", visibility: false });
                                setCurrentValue(0);

                            })
                            .catch((error) => {
                                console.log(error);
                                setProcessing(false);
                                console.log("stopped processing");
                                alert(error);
                                setShowRatingPopupMobileView({ ...showRatingPopupMobileView, serviceId: "", visibility: false });
                                setCurrentValue(0);

                            });
                    }
                    // let updatedStars = "";
                    // for (let i = 0; i < currentValue; i++) {
                    //     updatedStars += "*";
                    // }
                    // document.getElementById(showRatingPopupMobileView.serviceId).nextSibling.nextSibling.nextSibling.innerHTML = updatedStars;
                } else {
                    setProcessing(false);
                    console.log("stopped processing");
                    alert("Try to submit again!");
                }
                if (currentValue > 2) {
                    setProcessing(false);
                    console.log("stopped processing");
                    alert("Feedback submitted successfully!");
                    setShowRatingPopupMobileView({ ...showRatingPopupMobileView, serviceId: "", visibility: false });
                    setCurrentValue(0);

                }
            }
        ).catch((exception) => {
            console.log("Error is" + exception);
        })


    }
    return (
        <>
            <div className='h-5/6 sm:h-5/6 overflow-y-auto '>

                <div className='flex ml-5 sm:ml-10 flex-col sm:flex-row  gap-5 sm:gap-1 sm:justify-between w-11/12 sm:w-11/12 relative my-5'>
                    <div className="font-semibold text-xl hidden sm:inline-flex">Service Schedule</div>
                    <div className="sm:hidden flex justify-between gap-20 pr-5">
                        <div className="font-semibold text-xl">Service Schedule</div>
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
                                    <button id="btnNext" onClick={applyDateFilter}>Next Month</button>
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
                                <th className="py-4 sm:py-8 px-2 align-top">Service ID</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Branch</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Date</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Name</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Status</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Action</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Rating</th>
                            </tr>
                        </thead>
                        {/* {serviceList ? (<ServicesTable serviceList={currentPosts} loading={loading} />) :  */}
                        {(loading ? (<tbody><tr><td><div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                            ></div>
                            <div className="flex justify-center items-center min-h-screen">
                                <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                    <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                                </div>
                            </div>
                        </div></td></tr></tbody>) : (serviceList !== null ? (<ServicesTable serviceList={currentPosts} loading={loading} />) : (<tbody><tr>
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
                        </div>) : (currentPosts !== null ? (currentPosts.map(service => (
                            <div className="flex flex-col gap-1 bg-white rounded-lg">
                                <div className='flex gap-2 justify-between'>
                                    <div className="flex gap-2 justify-start align-top text-left text-[#63636e] text-sm  font-semibold">
                                        <div className=" pl-2 align-top" id={service.serviceId}>{service.serviceDate}<br />
                                            <div className='flex'>
                                                {service.status === "Completed" ? (<TiTick className='mr-3 text-green-400' />) : (service.status === "Cancelled" ? (<FcCancel className='mr-3 text-red-400' />) : (<MdSchedule className='mr-3 text-blue-400' />))}

                                                {service.customerFeedback === null ? (null) : (
                                                    service.customerFeedback === "Poor" ? (<FaStar className='text-[#FFBA5A]' size="10" />) :
                                                        (service.customerFeedback === "Average" ?
                                                            (<div className='flex flex-row'><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>) :
                                                            (service.customerFeedback === "Good" ? (<div className='flex flex-row'><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>) :
                                                                (service.customerFeedback === "Very Good" ? (<div className='flex flex-row '><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>) :
                                                                    (service.customerFeedback === "Excellent" ? (<div className='flex flex-row '><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>) : ("")))))

                                                )}
                                            </div>
                                        </div>
                                        <div className="text-left  align-top">{service.productName}</div>
                                    </div>
                                    <div>
                                        <button onClick={expandMore} id={"ExpandMore" + service.serviceId} ><MdOutlineExpandMore /></button>
                                        <button onClick={expandLess} id={"ExpandLess" + service.serviceId} className='hidden' ><MdOutlineExpandLess /></button>
                                    </div>
                                </div>
                                <div id={"section" + service.serviceId} className='hidden'>
                                    <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                        <div className=" px-2 align-top">Service Id : {service.serviceId}</div>
                                        <div className=" px-2 align-top">Branch : {service.serviceBranch === "Service Address" ? ("Main Branch") : (service.serviceBranch)}</div>
                                        <div className=" px-2 align-top">Service Status : {service.status}</div>
                                        <div className=" px-2 align-bottom">Action : {
                                            service.status === "Completed" ?
                                                (<button name={service.serviceId} onClick={downloadSRMobileView} ><FcDownload /></button>) :
                                                (service.status === "Cancelled" || service.status === "Suspended" ? (null) : (<button name={service.serviceId} onClick={scheduleService} ><AiOutlineCalendar /></button>)
                                                )
                                        }</div>
                                        <div className="flex  px-2 align-bottom" id={"Rating" + service.serviceId}>Rating: &nbsp;&nbsp;
                                            {
                                                service.status === "Completed" ? (service.customerFeedback === null ? (<button name={service.serviceId} onClick={() => setShowRatingPopupMobileView({ ...showRatingPopupMobileView, serviceId: service.serviceId, visibility: true })}><VscFeedback className='text-lg text-blue-400' /></button>) : (

                                                    service.customerFeedback === "Poor" ? (<FaStar className='text-[#FFBA5A]' />) :
                                                        (service.customerFeedback === "Average" ?
                                                            (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                                            (service.customerFeedback === "Good" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                                                (service.customerFeedback === "Very Good" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) :
                                                                    (service.customerFeedback === "Excellent" ? (<div className='flex flex-row gap-1'><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>) : ("")))))

                                                )) : (null)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))) : (<div className='text-sm mx-4 text-center text-[#8181A5] font-semibold bg-white p-1' >No data found</div>)


                        ))}
                    </div>

                    {showReschedulePopupMobileView.visibility ? (

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                                onClick={() => setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false })}
                            ></div>
                            <div className="flex items-center min-h-screen px-4 ">
                                <div className="relative w-full max-w-lg p-1 mx-auto bg-white rounded-md shadow-lg">
                                    <div className="mt-3 sm:flex">
                                        <div className="mt-2 text-left sm:ml-4 sm:text-left">
                                            <h2 className="text-lg  mb-4 pl-4 ">Select the date on which you want to have a service.</h2>
                                            <h2 id="rescheduleError" className='text-red'></h2>
                                            <div>
                                                <label htmlFor='rescheduleDate' className='m-2 p-2 font-semibold'>Select date :</label><br />
                                                <input type="date" id="rescheduleDate" defaultValue={new Date().toISOString().slice(0, 10)} className='m-4 p-2 border-2 w-3/4 rounded-lg' />
                                            </div>
                                            <div>
                                                <label className='m-2 p-2 font-semibold'>Select time :</label><br />
                                                {/* <input type="time" id="rescheduleTime" className='m-4 p-2 border-2 w-3/4 rounded' /> */}
                                                <div className='flex gap-2 p-2'>
                                                    <select id='hourSelector' className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                        <option value="0">--</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select>
                                                    <select id="minuteSelector" className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                        <option value="0">--</option>
                                                        <option value="00">00</option>
                                                        <option value="05">05</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="20">20</option>
                                                        <option value="25">25</option>
                                                        <option value="30">30</option>
                                                        <option value="35">35</option>
                                                        <option value="40">40</option>
                                                        <option value="45">45</option>
                                                        <option value="50">50</option>
                                                        <option value="55">55</option>
                                                    </select>
                                                    <select id="ampmSelector" className='bg-white border-gray-300 border-2 rounded-lg p-2 mx-2'>
                                                        <option value="0">--</option>
                                                        <option value="AM">AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>

                                                </div>

                                            </div>
                                            <div>
                                                <label htmlFor='rescheduleReason' className='m-2 p-2 font-semibold'>Reason :</label><br />
                                                <textarea id="rescheduleReason" className='mx-4 mt-4 p-2 border-2 w-3/4 rounded-lg'></textarea>
                                            </div>
                                            <div className="items-center gap-10 mt-3 flex justify-center">
                                                <button
                                                    className=" my-2 p-2.5 w-32 text-white bg-sky-600 text-lg rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                                    onClick={reschedule}
                                                >
                                                    Reschedule
                                                </button>
                                                <button
                                                    className=" my-2 p-2.5 w-32 text-white text-lg bg-sky-600  rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                    onClick={() =>
                                                        setShowReschedulePopupMobileView({ ...showReschedulePopupMobileView, serviceId: "", visibility: false })
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : null}
                    {showRatingPopupMobileView.visibility ? (

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                                onClick={() => setShowRatingPopupMobileView({ ...showRatingPopupMobileView, serviceId: "", visibility: false })}
                            ></div>
                            <div className="flex items-center min-h-screen px-4 py-8">
                                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                    {/* <div className="mt-3 sm:flex"> */}
                                    {/* <div className="mt-2 text-left sm:ml-4 sm:text-left"> */}

                                    <div className='flex flex-col align-center justify-center gap-5 m-5'>
                                        <h2 className="font-semibold text-lg"> Rate the Service </h2>
                                        <div className='flex flex-row gap-2 w-fit'>
                                            {stars.map((_, index) => {
                                                return (
                                                    <>
                                                        {(hoverValue || currentValue) > index ? (
                                                            <FaStar
                                                                key={index}
                                                                size={24}
                                                                onClick={() => handleClick(index + 1)}
                                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                                onMouseLeave={handleMouseLeave}
                                                                className=' cursor-pointer text-3xl text-[#FFBA5A]'
                                                            />
                                                        ) : (
                                                            <FaStar
                                                                key={index}
                                                                size={24}
                                                                onClick={() => handleClick(index + 1)}
                                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                                onMouseLeave={handleMouseLeave}
                                                                className=' cursor-pointer text-3xl text-[#a9a9a9]'
                                                            />
                                                        )

                                                        }
                                                    </>

                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor='customerFeedback' className="text-md font-semibold mt-3" >Enter Remark:</label>
                                            <textarea id="customerFeedback" className="border-2 border-gray-300 rounded w-lg mt-3" rows="5" ></textarea>
                                        </div>

                                        <button className=" mt-2 p-2.5 flex-1 text-white bg-sky-600 text-lg rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                            onClick={submitFeedback}>
                                            Submit
                                        </button>

                                    </div>
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    ) : null}
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
            {serviceList && (
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={serviceList.length}
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



export default BaseHoc(ServiceSchedule);
export { Pagination };
