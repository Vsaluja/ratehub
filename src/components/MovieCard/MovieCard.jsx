import React from 'react'
import './Style.scss';
import Img from '../Img/Img';
import CircleRating from '../CircleRating/CircleRating';
import { useSelector } from 'react-redux';
import noPoster from '../../assets/no-poster.png';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ item, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const path = item?.poster_path ? url.poster + item.poster_path : noPoster;
    const navigate = useNavigate();
    return (
        <div className="carousel-item" onClick={() => navigate(`/${item.media_type || mediaType}/${item.id} `)}>
            <div className="backdrop-img">
                <Img src={path} />
                <CircleRating rating={(item?.vote_average || 0).toFixed(1)} />
            </div>
            <div className="title">{item.title || item.name}</div>
            <div className="date">{dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}</div>
        </div>
    )
}

export default MovieCard
