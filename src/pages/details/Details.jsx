import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner';
import { useEffect, useState } from 'react';
import Similar from './Similar/Similar';
import Container from '../../components/Container/Container';
import Recommendation from './Recommendation/Recommendation';
import './Style.scss';
import Cast from './Cast/Cast';
import Videos from './Videos/Videos';


const Details = () => {

    const { mediaType, id } = useParams();
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading, error: creditsError } = useFetch(`/${mediaType}/${id}/credits`);

    const [trailer, setTrailer] = useState();


    const findTrailer = () => {
        let foundTrailer = data?.results?.find((item) => {
            return item.type === "Trailer";
        })

        setTrailer(foundTrailer);

    }


    useEffect(() => {
        findTrailer();
    }, [data, credits])

    return (
        <div className='details'>
            {error || creditsError ? (<div>Some unknown error occurred</div>) :
                (<>
                    <DetailsBanner video={trailer || data?.results[0]} crew={credits?.crew} />
                    <Cast cast={credits?.cast} />
                    <Videos videos={data} />
                    <Similar mediaType={mediaType} id={id} />
                    <Recommendation mediaType={mediaType} id={id} />
                </>)}
        </div>
    )
}

export default Details
