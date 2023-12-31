import React, { useEffect, useRef, useState } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/Img/Img';
const Videos = ({ videos }) => {

    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        // 240px width + 20px gap
        const scrollAmount = dir === "left" ? container.scrollLeft - (260 * 5) : container.scrollLeft + (260 * 5);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })

    }

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    return (
        <div className='videos'>
            {videos?.results?.length > 0 && (
                <Container>
                    <h2>Videos</h2>
                    <div className="carousel">

                        {videos?.results?.length >= 5 && (

                            <div className="arrows">
                                <i className="arrow left ri-arrow-left-circle-line" onClick={() => navigation("left")}></i>
                                <i className="arrow right ri-arrow-right-circle-line" onClick={() => navigation("right")}></i>
                            </div>
                        )}
                        <div className="carousel-container" ref={carouselContainer}>
                            <div className="carousel-items">
                                {videos?.results?.map((item, i) => {
                                    return (
                                        <div key={i} className="carousel-item">
                                            <div className="videos" onClick={() => {
                                                setShow(true)
                                                setVideoId(item.key);
                                            }}>
                                                <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </Container>
            )}
        </div>
    )
}

export default Videos
