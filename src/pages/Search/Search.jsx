import React, { useEffect, useState } from 'react'
import './Style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../API/API';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import Container from '../../components/Container/Container';
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

                <h3>{`Search results for "${query}"`}</h3>

                {data?.results?.length > 0 ?
                    (
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
                    )
                    :
                    (<div>Loading...</div>)}
            </Container>
        </div>
    )
}

export default Search
