import React, { useEffect, useState } from 'react'
import './Style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { fetchDataFromApi } from '../../API/API';
import Container from '../../components/Container/Container';
import MovieCard from '../../components/MovieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Explore = () => {

    const { mediaType } = useParams();
    const [data, setData] = useState();
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`)
            .then((res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })
    }

    const fetchNextData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`)
            .then((res) => {
                setData({ ...data, results: [...data?.results, ...res?.results] });
                setPageNum((prev) => prev + 1);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })
    }

    useEffect(() => {
        fetchInitialData();
    }, [mediaType]);


    return (
        <div className='explore'>


            <Container>
                <h3>{`Explore ${mediaType === "movie" ? "Movies" : "TV Shows"}`}</h3>
                {data?.results?.length > 0 ?
                    (
                        <InfiniteScroll
                            className='items'
                            dataLength={data?.results?.length || []}
                            next={fetchNextData}
                            hasMore={pageNum <= data?.total_pages}
                        >
                            {data?.results?.map((item) => {
                                return <MovieCard key={item.id} item={item} mediaType={mediaType} />
                            })}
                        </InfiniteScroll>
                    )
                    :
                    (<div>Loading..</div>)}
            </Container>
        </div>
    )
}

export default Explore
