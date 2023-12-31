import React, { useEffect, useRef } from 'react'
import './Style.scss';
import Container from '../Container/Container';
import Img from '../Img/Img';
import { useSelector } from 'react-redux';
import noPoster from '../../assets/no-poster.png';
import { useNavigate } from 'react-router-dom';
import CircleRating from '../CircleRating/CircleRating';
import dayjs from 'dayjs';
import Spinner from '../Spinner/Spinner';

const Carousel = ({ data, loading, mediaType, containerRef }) => {
    const { url } = useSelector((state) => state.home);
    const carouselContainer = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const container = carouselContainer.current;
        containerRef(container);
    }, [loading, data])


    return (
        <div className='carousel'>
            <div className="carousel-container">
                {!loading ? (
                    <div className="carousel-items" ref={carouselContainer}>
                        {data?.results?.map((item, i) => {
                            const path = item.poster_path ? url.poster + item.poster_path : noPoster;
                            return (
                                <div key={i} className="carousel-item" onClick={() => { navigate(`/${item.media_type || mediaType}/${item.id}`); window.scrollTo(0, 0); }}>
                                    <div className="backdrop-img">
                                        <Img src={path} />
                                        <CircleRating rating={(item.vote_average).toFixed(1)} />
                                    </div>
                                    <div className="title">{item.title || item.name}</div>
                                    <div className="date">{dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}</div>
                                </div>
                            )
                        })}
                    </div>
                )
                    :
                    (<Spinner />)}
            </div>
        </div>
    )
}

export default Carousel
