import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner';
import { useEffect } from 'react';


const Details = () => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);


    return (
        <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
    )
}

export default Details
