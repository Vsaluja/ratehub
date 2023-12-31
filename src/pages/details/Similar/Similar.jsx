import React, { useEffect, useState } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';
import Arrow from '../../../components/Arrow/Arrow';

const Similar = ({ mediaType, id }) => {

    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);


    const [conRef, setConRef] = useState();

    const containerRef = (ref) => {
        setConRef(ref);
    }

    return (
        <div className='similar'>
            {
                data?.results?.length > 0 && (

                    <Container>
                        <div className="left">
                            <h2>Similar {mediaType === "movie" ? "Movies" : "TV Shows"}</h2>
                            {data?.results?.length >= 5 && (
                                <Arrow width={240} gap={20} noOfItems={5} containerRef={conRef} />
                            )}
                        </div>
                        <Carousel data={data} loading={loading} mediaType={mediaType} containerRef={containerRef} />
                    </Container>

                )
            }
        </div>

    )
}

export default Similar
