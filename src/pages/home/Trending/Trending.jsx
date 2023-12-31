import React, { useState } from 'react'
import Container from '../../../components/Container/Container'
import './Style.scss'
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs'
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';
import Arrow from '../../../components/Arrow/Arrow';



const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const options = ["Day", "Week"];
    const { data, loading, error } = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }

    const [conRef, setConRef] = useState();

    const containerRef = (ref) => {
        setConRef(ref);
    }

    return (
        <div className='trending box'>
            <Container>
                <div className="box-items">
                    <div className="left">
                        <span>Trending</span>
                        <Arrow width={240} gap={20} noOfItems={5} containerRef={conRef} />
                    </div>
                    <SwitchTabs data={options} onTabChange={onTabChange} current="Day" />
                </div>
                <Carousel data={data} loading={loading} containerRef={containerRef} />
            </Container>
        </div>
    )
}

export default Trending
