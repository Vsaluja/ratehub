import React, { useEffect, useRef } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import Img from '../../../components/Img/Img';
import noAvatar from '../../../assets/avatar.png';
import { useSelector } from 'react-redux';

const Cast = ({ cast }) => {

    const { url } = useSelector((state) => state.home);

    const carouselContainer = useRef();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        // 200px width + 20px gap
        const scrollAmount = dir === "left" ? container.scrollLeft - (220 * 6) : container.scrollLeft + (220 * 6);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })

    }

    return (

        <div className='cast'>
            {cast?.length > 0 && (


                <Container>
                    <h2>Cast</h2>
                    <div className="carousel">

                        {cast?.length >= 6 && (

                            <div className="arrows">
                                <i className="arrow left ri-arrow-left-circle-line" onClick={() => navigation("left")}></i>
                                <i className="arrow right ri-arrow-right-circle-line" onClick={() => navigation("right")}></i>
                            </div>
                        )}
                        <div className="carousel-container" ref={carouselContainer}>
                            <div className="carousel-items">
                                {cast?.map((item, i) => {
                                    const path = item.profile_path ? url.profile + item.profile_path : noAvatar;
                                    return (
                                        <div key={i} className="carousel-item">
                                            <div className="profile">
                                                <Img src={[path]} />
                                            </div>
                                            <div className="originalName">{item.original_name}</div>
                                            <div className="charName">{item.character}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </Container>
            )}
        </div>
    )
}

export default Cast
