import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner';
import { useEffect } from 'react';
import Similar from './Similar/Similar';
import Container from '../../components/Container/Container';
import Recommendation from './Recommendation/Recommendation';
import './Style.scss';
import Cast from './Cast/Cast';
import Videos from './Videos/Videos';


const Details = () => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);


    return (
        <div className='details'>
            <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
            <Cast cast={credits?.cast} />
            <Videos videos={data} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
