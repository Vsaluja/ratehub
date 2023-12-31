import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch';
import Container from '../../../components/Container/Container';
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs';
import Carousel from '../../../components/Carousel/Carousel';
import './Style.scss'
import Arrow from '../../../components/Arrow/Arrow';

const Popular = () => {
    const options = ["Movies", "TV"];
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading, error } = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }

    const [conRef, setConRef] = useState();

    const containerRef = (ref) => {
        setConRef(ref);
    }

    return (

        <div className='popular box'>
            <Container>
                {error ? (<div>Something went wrong {console.log(error)}</div>)
                    :
                    (
                        <>
                            <div className="box-items">
                                <div className="left">
                                    <span>What's Popular ?</span>
                                    <Arrow width={240} gap={20} noOfItems={5} containerRef={conRef} />
                                </div>
                                {/* In popular section of API we don't get the mediaType so have to manually send the mediatype */}
                                <SwitchTabs data={options} onTabChange={onTabChange} current="Movies" />
                            </div>
                            <Carousel data={data} loading={loading} mediaType={endpoint} containerRef={containerRef} />
                        </>

                    )}
            </Container>
        </div>
    )
}

export default Popular
