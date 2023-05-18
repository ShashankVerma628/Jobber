import React from "react";

const Stats = ({ icon, text, value }) => {
  return (
    <div className="stats-container">
      <h2 className="stats-value">{value}</h2>
      <h3 className="stats-text">
        {icon}
        <span>{text}</span>
      </h3>
    </div>
  );
};

export default Stats;
