import React from "react";
// import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
            <div  className="custom-input para-1">
                {/* <h3 className="custom-input__label">Custom Input: </h3> */}
                <textarea
                rows="5"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={`Custom Input`}
                className="custom-input__textarea"
               
            ></textarea>
            </div>
    );
};

export default CustomInput;
