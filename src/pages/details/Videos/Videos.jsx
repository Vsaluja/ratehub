import React, { useEffect, useRef, useState } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/Img/Img';
import Arrow from '../../../components/Arrow/Arrow';
import playBtn from '../../../assets/playBtn.png';

const Videos = ({ videos }) => {

    const carouselContainer = useRef();


    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    const [conRef, setConRef] = useState();

    useEffect(() => {
        const container = carouselContainer.current;
        setConRef(container);
    }, [videos])


    return (
        <div className='videos'>
            {videos?.results?.length > 0 && (
                <Container>
                    <div className="left">

                        <h2>Videos</h2>
                        {videos?.results?.length >= 6 && (
                            // width of carousel item and gap of carousel items in scss
                            <Arrow width={240} gap={20} noOfItems={5} containerRef={carouselContainer.current} />

                        )}
                    </div>
                    <div className="carousel">

                        <div className="carousel-container">
                            <div className="carousel-items" ref={carouselContainer}>
                                {videos?.results?.map((item, i) => {
                                    return (
                                        <div key={i} className="carousel-item">
                                            <div className="videos" onClick={() => {
                                                setShow(true)
                                                setVideoId(item.key);
                                            }}>
                                                <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                                <img className="playBtn" src={playBtn} />
                                            </div>
                                            <div className="name">{item.name}</div>
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
