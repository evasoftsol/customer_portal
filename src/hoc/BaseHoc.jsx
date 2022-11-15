
import React from "react";

const BaseHoc = (Component) => ({ ...props }) => {

    return (
        <div>
            <div>header</div>
            <div>
                <Component {...props} />
            </div>
            <div>footer</div>
        </div>
    )
};


export default BaseHoc;