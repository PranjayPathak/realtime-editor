import React from "react";

const OutputPannel = ({ outputDetails }) => {
  console.log("output details: ", outputDetails);
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="error">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="success">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="info">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="error">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="output-terminal para-1">
      <p className="output-placeholder">Output Terminal</p>
      <div>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputPannel;
