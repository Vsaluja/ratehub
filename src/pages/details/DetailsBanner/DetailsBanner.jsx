import React, { useEffect, useState } from 'react'
import Img from '../../../components/Img/Img';
import Container from '../../../components/Container/Container';
import { useSelector } from 'react-redux';
import './Style.scss'
import dayjs from 'dayjs';
import CircleRating from '../../../components/CircleRating/CircleRating';
import useFetch from '../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import noPoster from '../../../assets/no-poster.png'
import playBtn from '../../../assets/playBtn.png';

const DetailsBanner = ({ video, crew }) => {
    const { mediaType, id } = useParams();
    const { data, loading, error } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);
    const bg = url?.backdrop + data?.backdrop_path;
    const path = data?.poster_path ? url?.backdrop + data?.poster_path : noPoster;

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const director = crew?.filter((cast) => {
        return cast.job === "Director";
    })

    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");


    // for videoPopup
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    return (
        <div className='detailsBanner'>
            {error ? (<div>Something went wrong. Please go back {console.log("My error", error)}</div>) :
                (<>

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
                                <div className='btn' onClick={() => {
                                    setShow(true)
                                    setVideoId(video.key);
                                }}>
                                    <img className='play' src={playBtn} alt="" />
                                    <span>Watch Trailer</span>
                                </div>
                            </div>
                            <div className="overview">
                                <span>Overview</span>
                                <p>{data?.overview}</p>
                            </div>

                            <div className="info">
                                {data?.status && (
                                    <div className="info-item">
                                        <span className="item">
                                            Status: {" "}
                                        </span>
                                        <span className="item-text">
                                            {data?.status}
                                        </span>
                                    </div>
                                )}
                                {data?.release_date && (
                                    <div className="info-item">
                                        <span className="item">
                                            Release Date: {" "}
                                        </span>
                                        <span className="item-text">
                                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                )}
                                {data?.runtime && (

                                    <div className='info-item'>
                                        <span className="item">
                                            Duration: {" "}
                                        </span>
                                        <span className="item-text">
                                            {toHoursAndMinutes(data?.runtime)}
                                        </span>
                                    </div>



                                )}
                                {data?.number_of_seasons && (

                                    <div className='info-item'>
                                        <span className="item">
                                            Seasons: {" "}
                                        </span>
                                        <span className="item-text">
                                            {data?.number_of_seasons}
                                        </span>
                                    </div>



                                )}
                            </div>

                            {director?.length > 0 && (
                                <div className="info">
                                    <div className="info-item">
                                        <span className="item">
                                            Director: {" "}
                                        </span>
                                        {director.map((d, i) => {
                                            return (
                                                <span key={i} className="item-text">
                                                    {d.name}
                                                    {director.length - 1 !== i ? ", " : ""}
                                                </span>
                                            )

                                        })}

                                    </div>
                                </div>
                            )}

                            {writer?.length > 0 && (
                                <div className="info">
                                    <div className="info-item">
                                        <span className="item">
                                            Writer: {" "}
                                        </span>
                                        {writer?.map((d, i) => (
                                            <span key={i} className="item-text">
                                                {d.name}
                                                {writer.length - 1 !== i ? ", " : ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <VideoPopup
                            show={show}
                            setShow={setShow}
                            videoId={videoId}
                            setVideoId={setVideoId}
                        />
                    </Container>
                </>)}
        </div>
    )
}

export default DetailsBanner
