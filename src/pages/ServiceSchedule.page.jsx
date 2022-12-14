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
    let companyId = localStorage.getItem("companyId");

    console.log("currentPage=" + currentPage)
    useEffect(() => {
        console.log("in useEffect");
        getServiceList("", "");
    }, []);

    const getServiceList = (selectedDateFilter, selectedBranch) => {
        console.log("in getServiceList");
        // let url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=5659313586569216&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=1/12/2022&toDate=3/12/2022&apiCallFrom=CustomerPortal";
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
        url = "https://" + appid + ".appspot.com/slick_erp/analyticsOperations?loadType=Customer Service&authCode=" + companyId + "&customerCellNo=" + customerCell + "&customerEmail=" + customerEmail + "&fromDate=" + fromDate + "&toDate=" + toDate + "&apiCallFrom=CustomerPortal";


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
        const tempServiceList = [{ "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "01\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "Others", "type": "", "branch": "Andheri", "productName": "Cockroach management treatment", "serviceValue": "1222.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 11, "serviceId": 100078229, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000044, "contractStartDate": "31\/01\/2022", "contractEndDate": "30\/01\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "CMT-01", "contractId": 500001728, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6310235238039552, "status": "Cancelled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "02\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": null, "type": "", "branch": "Andheri", "productName": "Cockroach management treatment", "serviceValue": "3847.87", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 9004245917, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 1, "serviceId": 100085975, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000044, "contractStartDate": "02\/12\/2022", "contractEndDate": "01\/12\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "CMT-01", "contractId": 500001986, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4697835835490304, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "02\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 3, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "111.11", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "Peter Spider", "scheduleStatus": true, "serviceSrNo": 1, "serviceId": 100085954, "group": "", "trackingDetais": [{ "dateTime": "02\/12\/2022 16:47:26", "km": 0.0, "latitude": "20.0148847", "location": "2R7F RPX2R7F RPX, Matru Darshan Society, Amrutdham, Nashik, Maharashtra 422006, IndiaNashikMaharashtraIndia422006", "time": "16:47", "status": "Started", "longitude": "73.824353" }, { "dateTime": "02\/12\/2022 16:53:25", "km": 0.0, "latitude": "20.0148842", "location": "2R7F RPXSunrise   Residency, Sant Savata Mali Nagar, 2R7F RPX, Matru Darshan Society, Amrutdham, Nashik, Maharashtra 422006, IndiaNashikMaharashtraIndia422006", "time": "16:53", "status": "Reported", "longitude": "73.8243563" }, { "dateTime": "02\/12\/2022 16:56:43", "km": 0.0, "latitude": "20.0148824", "location": "2R7F RPX2R7F RPX, Matru Darshan Society, Amrutdham, Nashik, Maharashtra 422006, IndiaNashikMaharashtraIndia422006", "time": "16:58", "status": "Completed", "longitude": "73.8243479" }, { "dateTime": "02\/12\/2022 16:56:39", "km": 0.0, "latitude": "20.0148854", "location": "2R7F RPXSunrise ?? Residency, Sant Savata Mali Nagar, 2R7F RPX, Matru Darshan Society, Amrutdham, Nashik, Maharashtra 422006, IndiaNashikMaharashtraIndia422006", "time": "16:56", "status": "TCompleted", "longitude": "73.8243563" }], "quantity": 0.0, "productId": 500000005, "contractStartDate": "02\/12\/2022", "contractEndDate": "01\/12\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "04:45PM", "customerName": "UNIVERSAL SOMPO", "completionRemark": "Good service", "productCode": "BB", "contractId": 500001986, "customerFeedback": "Very Good", "completionDate": "02\/12\/2022", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 4961991692124160, "status": "Cancelled" }, { "serviceType": "Periodic", "serviceNumber": 3, "serviceDate": "02\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": null, "type": "", "branch": "Andheri", "productName": "GENERAL DISINFESTATION", "serviceValue": "4500.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 9004245917, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 1, "serviceId": 100085987, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000008, "contractStartDate": "02\/12\/2022", "contractEndDate": "01\/12\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "GD001", "contractId": 500001986, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5329644113887232, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 4, "serviceDate": "02\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": null, "type": "", "branch": "Andheri", "productName": "Bed Bugs Treatment", "serviceValue": "333.33", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 9004245917, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 1, "serviceId": 100085991, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "02\/12\/2022", "contractEndDate": "01\/12\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001986, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5611119090597888, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078452, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001787, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 4705746853822464, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078539, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001790, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5180490530160640, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078407, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001785, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5355122558238720, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078554, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001791, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5454581602451456, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078566, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001791, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5912712392474624, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078611, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001793, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6360776399912960, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078527, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001790, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6387759327477760, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078497, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001789, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6398136709808128, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "Peter Spider", "scheduleStatus": true, "serviceSrNo": 9, "serviceId": 100078419, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "04:15PM", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001785, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6441965643104256, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078509, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001789, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6590429170499584, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "05\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078599, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001793, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6745758676025344, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "500.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078518, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001789, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4532143403302912, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078545, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001790, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4758278065094656, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1666.67", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078428, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001785, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4805892340973568, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078620, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001793, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4883032772182016, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "07\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "50.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078754, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001805, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5164664713379840, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078575, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001791, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5490499927408640, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1666.67", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078425, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001785, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5650317271105536, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078617, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001793, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5727457702313984, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "500.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078515, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001789, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6168216705433600, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078572, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001791, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6334924857540608, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078458, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001787, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6421701718966272, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "07\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "50.00", "serviceDay": "Wednesday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078742, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001805, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6600812119719936, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078787, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "12\/04\/2022", "contractEndDate": "11\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001807, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 4986309908103168, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078479, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001788, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5362327295623168, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078584, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001792, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5395884814630912, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "500.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078799, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "12\/04\/2022", "contractEndDate": "11\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001807, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5519729257086976, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078367, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001782, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5718014277189632, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078437, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001786, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5718281434431488, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078824, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "12\/04\/2022", "contractEndDate": "11\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001811, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6228950784147456, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078467, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001788, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6295561616490496, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "08\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "333.33", "serviceDay": "Thursday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078392, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001784, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6728846859567104, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "GENERAL DISINFESTATION", "serviceValue": "250.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078760, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000008, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "GD001", "contractId": 500001805, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4742452248313856, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Rajkot", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078485, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001788, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4940114830557184, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078443, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001786, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5479121280827392, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Termite Treatment", "serviceValue": "3333.33", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078373, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001782, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5585356156043264, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Termite Treatment", "serviceValue": "3333.33", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078398, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001784, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5841963876089856, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Termite Treatment", "serviceValue": "2000.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078590, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001792, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5939518286856192, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "GENERAL DISINFESTATION", "serviceValue": "250.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078763, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000008, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "GD001", "contractId": 500001805, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6431302108577792, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "09\/12\/2022", "serviceBranch": "Etawah", "completionDuration": 0, "remark": "", "type": "", "branch": "Vikhroli", "productName": "Termite Treatment", "serviceValue": "1000.00", "serviceDay": "Friday", "customerId": 100000347, "customerMobNo": 1234567890, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078488, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000050, "contractStartDate": "09\/04\/2022", "contractEndDate": "08\/04\/2023", "locality": "Vikhroli", "serviceAddress": "R, LBS Marg, Vikhroli, Mumbai, Maharashtra, India,   Pin:123456", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "TT", "contractId": 500001788, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6628964690821120, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "10\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "3000.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078683, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001801, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5467972958158848, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 2, "serviceDate": "10\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Cockroach management treatment", "serviceValue": "275.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078695, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000044, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "CMT-01", "contractId": 500001801, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 5797983410978816, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "10\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "100.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078635, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001797, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 5951377899520000, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "10\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "25.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078671, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001800, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6189249767407616, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "10\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "Bed Bugs Treatment", "serviceValue": "1000.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 9, "serviceId": 100078712, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000005, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "BB", "contractId": 500001802, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 6.0, "category": "", "uniqueId": 6473760161923072, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "11\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "GENERAL DISINFESTATION", "serviceValue": "1200.00", "serviceDay": "Sunday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078718, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000008, "contractStartDate": "11\/04\/2022", "contractEndDate": "10\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "GD001", "contractId": 500001803, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 6086949213306880, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "12\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Ahmedabad", "productName": "GENERAL DISINFESTATION", "serviceValue": "500.00", "serviceDay": "Monday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 3, "serviceId": 100078833, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000008, "contractStartDate": "12\/04\/2022", "contractEndDate": "11\/04\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "GD001", "contractId": 500001812, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4643316151877632, "status": "Scheduled" }, { "serviceType": "Periodic", "serviceNumber": 1, "serviceDate": "31\/12\/2022", "serviceBranch": "Service Address", "completionDuration": 0, "remark": "", "type": "", "branch": "Andheri", "productName": "Cockroach management treatment", "serviceValue": "1222.00", "serviceDay": "Saturday", "customerId": 100000347, "customerMobNo": 999999999, "serviceEngineer": "", "scheduleStatus": false, "serviceSrNo": 12, "serviceId": 100078230, "group": "", "trackingDetais": [], "quantity": 0.0, "productId": 500000044, "contractStartDate": "31\/01\/2022", "contractEndDate": "30\/01\/2023", "locality": "", "serviceAddress": "ABC, Mumbai, Maharashtra, India", "serviceFeedback": "", "team": null, "serviceTime": "Flexible", "customerName": "UNIVERSAL SOMPO", "completionRemark": "", "productCode": "CMT-01", "contractId": 500001728, "customerFeedback": null, "completionDate": "", "premisesDetails": "", "servicingTimeInHrs": 0.0, "category": "", "uniqueId": 4902860354486272, "status": "Scheduled" }];

        // setServiceList(tempServiceList);
        // setLoading(false);
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
    return (
        <>
            <div className='h-5/6 sm:h-screen overflow-y-auto '>
                <div className='flex ml-5 sm:ml-10 flex-col sm:flex-row  gap-5 sm:gap-1 sm:justify-between w-screen sm:w-11/12  relative my-5'>
                    <div className="font-semibold text-xl hidden sm:inline-flex">Service Schedule</div>
                    <div className="sm:hidden flex justify-start gap-20">
                        <div className="font-semibold text-xl">Service Schedule</div>
                        <div className="flex justify-center align-baseline"><BsPersonCircle className='p-0' size="20" /></div>
                    </div>
                    <div className="flex gap-3">
                        <label htmlFor='CustomerBranchDropDown' className=''>Select Branch :</label>
                        {/* {hidden sm:inline-flex} */}
                        <select id="CustomerBranchDropDown" onChange={applyBranchFilter} className='rounded-lg bg-white border border-gray-300 px-2 mr-5 '>
                            {
                                createItems()
                            }
                        </select>
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
                    </div>
                </div>
                <div className='flex flex-col gap-2 ml-5 sm:ml-10 relative'>

                    <table className="hidden sm:table table-auto border-collapse border-spacing-2 rounded-lg bg-white w-screen sm:w-11/12 overflow-x-auto" >

                        <thead className="bg-red">
                            <tr className="text-left text-[#8181A5] text-sm  ">
                                <th className="py-4 sm:py-8 px-2 align-top">Service ID</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Service Branch</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Date</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Name</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Status</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Action</th>
                                <th className="py-4 sm:py-8 px-2 align-top">Rating</th>
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
                        </div></tr></tbody>) : (serviceList !== null ? (<ServicesTable serviceList={currentPosts} loading={loading} />) : (<tbody><tr>
                            <td className='text-sm mx-4 text-center text-[#8181A5] font-semibold' colSpan="7">No data found</td></tr></tbody>)))}
                    </table>

                    <div className="flex flex-col gap-2 sm:hidden rounded-lg  w-11/12  " >

                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078584">08/12/2022<br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078584" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078584" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078584"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078584</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078588">08/12/2022<br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>

                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078588" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078588" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078588"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078588</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078585">08/12/2022 <br />
                                    <div className='flex'><TiTick className='mr-3 text-green-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment Cockroach management treatment</div>
                                <button onClick={expandMore} id="ExpandMore100078585" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078585" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078585"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078585</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Completed</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078586">08/12/2022 <br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078586" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078586" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078586"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078586</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078587">08/12/2022 <br />
                                    <div className='flex'><FcCancel className='mr-3 text-red-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078587" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078587" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078587"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078587</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Cancelled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078589">08/12/2022 <br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078589" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078589" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078589"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078589</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078590">08/12/2022 <br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078590" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078590" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078590"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078590</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078591">08/12/2022 <br />
                                    <div className='flex'><MdSchedule className='mr-3 text-blue-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078591" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078591" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078591"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078591</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Scheduled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078592">08/12/2022 <br />
                                    <div className='flex'><FcCancel className='mr-3 text-red-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078592" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078592" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078592"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078592</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Cancelled</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 bg-white rounded-lg">
                            <div className="flex gap-2 justify-start align-top text-left text-[#8181A5] text-sm  ">
                                <div className=" px-2 align-top" id="100078593">08/12/2022 <br />
                                    <div className='flex'><TiTick className='mr-3 text-green-400' />
                                        <FaStar className='text-[#FFBA5A]' size="10" /><FaStar className=' text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /><FaStar className='text-[#FFBA5A]' size="10" /></div>
                                </div>
                                <div className=" px-2 align-top">Cockroach management treatment </div>
                                <button onClick={expandMore} id="ExpandMore100078593" ><MdOutlineExpandMore /></button>
                                <button onClick={expandLess} id="ExpandLess100078593" className='hidden' ><MdOutlineExpandLess /></button>
                            </div>
                            <div id={"section" + "100078593"} className='hidden'>
                                <div className="flex flex-col gap-2 justify-start align-top text-left text-[#8181A5] text-sm " >
                                    <div className=" px-2 align-top">Service Id : 100078593</div>
                                    <div className=" px-2 align-top">Service Branch : Main Branch</div>
                                    <div className=" px-2 align-top">Service Status : Completed</div>
                                    <div className=" px-2 align-bottom">Action : <AiOutlineCalendar className='inline' /></div>
                                    <div className="flex  px-2 align-bottom">Rating: <FaStar className='text-[#FFBA5A]' /><FaStar className=' text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /><FaStar className='text-[#FFBA5A]' /></div>
                                </div>
                            </div>
                        </div>

                        {/* {serviceList ? (<ServicesTable serviceList={currentPosts} loading={loading} />) :  */}
                        {/* {(loading ? (<tbody><tr><div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                        ></div>
                        <div className="flex justify-center items-center min-h-screen">
                            <div className=" animate-spin inline-block w-14 h-14 border-4 border-white rounded-full" role="status">
                                <span className="visually-hidden text-black-600 text-2xl font-bold"> O</span>
                            </div>
                        </div>
                    </div></tr></tbody>) : (serviceList !== null ? (<ServicesTable serviceList={currentPosts} loading={loading} />) : (<tbody><tr>
                        <td className='text-sm mx-4 text-center text-[#8181A5] font-semibold' colSpan="7">No data found</td></tr></tbody>)))} */}
                    </div>
                    {/* {serviceList && (
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={serviceList.length}
                            paginate={paginate}
                        />)
                    } */}
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
        // className = 'fixed bottom-0 flex flex-row justify-between align-center gap-2 h-16 bg-white text-[#8181A5] ml-5 sm:ml-10'
        <nav className=' flex flex-row gap:1 sm:gap-5 justify-between w-11/12 mb-4 ml-5 sm:ml-10'>
            {/* <nav className='absolute bottom-0 sm:bottom-0 flex flex-row gap:1 sm:gap-5 justify-between w-11/12 sm:w-9/12 h-14  sm:ml-10 '> */}
            {catalogNumbers > 1 ? (<button className=" hidden sm:inline-flex px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showPreviousPages}>Prev</button>) : (<div></div>)}
            {catalogNumbers > 1 ? (<button className="sm:hidden px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showPreviousPages}><GrFormPrevious /></button>) : (<div></div>)}
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
            {catalogNumbers > 1 ? (<button className="hidden sm:inline-flex px-1 sm:px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showNextPages}>Next</button>) : (<div></div>)}
            {catalogNumbers > 1 ? (<button className="sm:hidden px-3 py-2 bg-sky-600 text-white rounded-lg h-fit" onClick={showNextPages}><GrFormNext /></button>) : (<div></div>)}
        </nav >
    )
}



export default BaseHoc(ServiceSchedule);
export { Pagination };
