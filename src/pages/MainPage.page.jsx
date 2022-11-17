import React from "react";
import BaseHoc from "../hoc/BaseHoc";



const MainPage = () => {
    return (
        <div className="text-3xl">Table will be loaded here</div>
    )
}

export default BaseHoc(MainPage);