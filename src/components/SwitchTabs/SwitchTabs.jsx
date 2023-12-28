import React, { useState } from 'react'
import './Style.scss'
const SwitchTabs = ({ data, onTabChange, current }) => {
    const [selectedTab, setSelectedTab] = useState();
    const [currTab, setCurrTab] = useState(current);

    const activeTab = (tab, i) => {

        setSelectedTab(i);
        setCurrTab(null);
        onTabChange(tab);
    }

    return (
        <div className='switch'>
            {data.map((tab, i) => {
                return (
                    <div key={i} className={`tab ${selectedTab === i || currTab == tab ? "active" : ""}`} onClick={() => activeTab(tab, i)}>{tab}</div>
                )
            })}
        </div>
    )
}

export default SwitchTabs
