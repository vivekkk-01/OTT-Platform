import React, { useState } from "react";
import "./switchTab.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [left, setLeft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              onClick={activeTab.bind(null, tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span style={{ left }} className="movingBg" />
      </div>
    </div>
  );
};

export default SwitchTab;
