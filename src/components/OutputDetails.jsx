import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="output-details para-1">
      <p className="output-details__data">
        <span className="output-details__label">
          Status:
        </span><span className="output-details__value">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="output-details__data">
        <span className="output-details__label">
          Memory:
        </span><span className="output-details__value">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="output-details__data">
        <span className="output-details__label" >Time:</span>
        <span className="output-details__value">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default React.memo(OutputDetails);
