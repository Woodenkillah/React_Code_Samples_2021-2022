import React from "react";


const DataBox = ({ children, heading }) => (
  <div className="DataBox">
    <div className="DataBox-Heading">{heading}</div>
    {children}
  </div>
);

export default DataBox;