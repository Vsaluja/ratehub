import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner';
import { useEffect } from 'react';


const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <DetailsBanner data={data} />
    )
}

export default Details
