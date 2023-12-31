import React, { useEffect, useState } from 'react'
import './Style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { fetchDataFromApi } from '../../API/API';
import Container from '../../components/Container/Container';
import MovieCard from '../../components/MovieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/Spinner/Spinner';

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
                {data?.results?.length > 0 ?

                    (
                        <>
                            <h3>{`Explore ${mediaType === "movie" ? "Movies" : "TV Shows"}`}</h3>
                            <InfiniteScroll
                                className='items'
                                dataLength={data?.results?.length || []}
                                next={fetchNextData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item) => {
                                    return <MovieCard key={item.id} item={item} mediaType={mediaType} />
                                })}
                            </InfiniteScroll>
                        </>
                    )
                    :
                    (<Spinner />)}

            </Container>
        </div>
    )
}

export default Explore
