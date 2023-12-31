import React, { useEffect, useState } from 'react'
import './Style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../API/API';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import Container from '../../components/Container/Container';
import Spinner from '../../components/Spinner/Spinner';
import noResults from '../../assets/no-results.png';

const Search = () => {
    const { query } = useParams();
    const [data, setData] = useState();
    const [pageNum, setPageNum] = useState(0);

    const fetchInitialData = () => {
        fetchDataFromApi(`/search/multi?query=${query}`)
            .then((res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const fetchNextData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}}`)
            .then((res) => {
                setData((prev) => ({ ...prev, results: [...prev.results, ...res.results] }));
                setPageNum((prev) => prev + 1);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        fetchInitialData();
    }, [query])

    return (
        <div className='searchSection'>
            <Container>



                {data?.results?.length > 0 ?
                    (
                        <>
                            <h3>{`Search results for "${query}"`}</h3>
                            <InfiniteScroll
                                className='items'
                                dataLength={data?.results?.length || []}
                                next={fetchNextData}
                                hasMore={pageNum <= data?.total_pages}
                            >
                                {data?.results?.map((item) => {
                                    return <MovieCard key={item.id} item={item} />
                                })}

                            </InfiniteScroll>
                        </>
                    )
                    :
                    (data?.results?.length == 0 ?
                        (<div className='noResults'>
                            <img src={noResults} alt="" />
                            <h2>No results found</h2>
                        </div>)
                        :
                        (<Spinner />))}
            </Container>
        </div>
    )
}

export default Search
