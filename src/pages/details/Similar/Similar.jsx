import React, { useEffect } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';

const Similar = ({ mediaType, id }) => {

    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

    return (
        <div className='similar'>
            {
                data?.results?.length > 0 && (

                    <Container>
                        <h2>Similar {mediaType === "movie" ? "Movies" : "TV Shows"}</h2>
                        <Carousel data={data} loading={loading} mediaType={mediaType} />
                    </Container>

                )
            }
        </div>

    )
}

export default Similar
