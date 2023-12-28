import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch';
import Container from '../../../components/Container/Container';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import Carousel from '../../../components/Carousel/Carousel';
import './Style.scss'

const Popular = () => {
    const options = ["Movies", "TV"];
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }

    return (
        <div className='popular box'>
            <Container>
                <div className="box-items">
                    <span>What's Popular ?</span>
                    <SwitchTabs data={options} onTabChange={onTabChange} current="Movies" />
                </div>
                <Carousel data={data} loading={loading} />
            </Container>
        </div>
    )
}

export default Popular
