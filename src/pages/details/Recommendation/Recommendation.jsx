import React, { useEffect } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';


const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        <div className='recommendation'>
            {
                data?.results?.length > 0 && (

                    <Container>
                        <h2>Recommended</h2>
                        <Carousel data={data} loading={loading} mediaType={mediaType} />
                    </Container>

                )
            }
        </div>
    )
}

export default Recommendation
