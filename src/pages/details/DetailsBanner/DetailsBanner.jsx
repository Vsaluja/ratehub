import React from 'react'
import Img from '../../../components/Img/Img';
import Container from '../../../components/Container/Container';
import { useSelector } from 'react-redux';
import './Style.scss'
import dayjs from 'dayjs';
import CircleRating from '../../../components/CircleRating/CircleRating';

const DetailsBanner = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const bg = url?.backdrop + data?.backdrop_path;
    const path = url?.backdrop + data?.poster_path;

    return (
        <div className='detailsBanner'>
            <div className="backdrop">
                <Img src={bg} />
            </div>
            <div className="opacity-layer"></div>
            <Container>
                <div className="left">
                    <Img src={path} />
                </div>
                <div className="right">
                    <div className="title">
                        {`${data?.title || data?.name} (${dayjs(data?.release_date || data?.first_air_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">
                        {data?.tagline}
                    </div>
                    <div className="icons">
                        <CircleRating rating={(data?.vote_average)?.toFixed(1) || 0} />
                        <i class="play ri-play-circle-fill"></i>
                        <span>Watch Trailer</span>
                    </div>
                    <div className="overview">
                        <span>Overview</span>
                        <p>{data?.overview}</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DetailsBanner
