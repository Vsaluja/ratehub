import React, { useEffect, useState } from 'react'
import './Style.scss'
import useFetch from '../../../Hooks/useFetch'
import { useSelector } from 'react-redux';
import Img from '../../../components/Img/Img';
import Container from '../../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
const HeroBanner = () => {
    const [bg, setBg] = useState();
    const { url } = useSelector((state) => state.home);
    let page = 1;
    const { data, loading } = useFetch(`/movie/upcoming?page=${page}`);
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // const random = Math.floor(Math.random() * 20);
        // If react.strictmode in main.jsx is not enabled the proper bg url might not work because url.backdrop will show up as undefined
        const path = url.backdrop + data?.results[8]?.backdrop_path;
        setBg(path);
    }, [data])

    const onSearch = (e) => {
        if (e.key === "Enter") {
            window.scrollTo(0, 0);
            navigate(`/search/${input}`);
            setInput("");
        }
    }

    return (
        <div className='heroBanner'>
            <div className="backdrop">
                <Img src={bg} />
            </div>
            <div className="opacity-layer"></div>
            <Container>
                <div className="heroContent">
                    <h3>Explore Movies, TV Shows and more..</h3>
                    <div className="search">

                        <input
                            type="text"
                            placeholder='Search for a Movie or TV Show'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => onSearch(e)}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HeroBanner
