import React, { useEffect, useRef, useState } from 'react'
import './Style.scss';
import Container from '../../../components/Container/Container';
import Img from '../../../components/Img/Img';
import noAvatar from '../../../assets/avatar.png';
import { useSelector } from 'react-redux';
import Arrow from '../../../components/Arrow/Arrow';

const Cast = ({ cast }) => {

    const { url } = useSelector((state) => state.home);

    const carouselContainer = useRef();

    const [conRef, setConRef] = useState();

    useEffect(() => {
        const container = carouselContainer.current;
        setConRef(container);
    }, [cast])


    return (

        <div className='cast'>
            {cast?.length > 0 && (


                <Container>
                    <div className="left">

                        <h2>Cast</h2>
                        {cast?.length >= 6 && (
                            // width of carousel item and gap of carousel items in scss
                            <Arrow width={200} gap={20} noOfItems={6} containerRef={conRef} />

                        )}
                    </div>
                    <div className="carousel">

                        <div className="carousel-container" >
                            <div className="carousel-items" ref={carouselContainer}>
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
