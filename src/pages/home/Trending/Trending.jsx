import React, { useState } from 'react'
import Container from '../../../components/Container/Container'
import './Style.scss'
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs'
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';



const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const options = ["Day", "Week"];
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }


    return (
        <div className='trending box'>
            <Container>
                <div className="box-items">
                    <span>Trending</span>
                    <SwitchTabs data={options} onTabChange={onTabChange} current="Day" />
                </div>
                <Carousel data={data} loading={loading} />
            </Container>
        </div>
    )
}

export default Trending
