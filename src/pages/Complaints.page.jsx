import React, { useState } from 'react'
import BaseHoc from '../hoc/BaseHoc';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from 'react-icons/ai';
const Complaints = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const handleDateSelect = event => {
        console.log("" + event.getDate() + "/" + event.getMonth() + "/" + event.getFullYear());
        const confirmBox = window.confirm(
            "Do you really want to rescedule the service to selected date?"
        )
        if (confirmBox === true) {
            alert("you pressed yes");
            setStartDate(event)
            setIsOpenDatePicker(false);
        } else {
            setIsOpenDatePicker(false);
        }
    }
    const openDatePicker = event => {
        setIsOpenDatePicker(true);

    }

    return (
        <>
            <div>Complaints</div>
            <button onClick={openDatePicker}><AiOutlineCalendar /></button>
            <DatePicker onSelect={handleDateSelect} open={isOpenDatePicker} />
            {/* selected={startDate} onChange={(date) => setStartDate(date)} */}
        </>
    );
}

export default BaseHoc(Complaints);