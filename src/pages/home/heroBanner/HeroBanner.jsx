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
        const random = Math.floor(Math.random() * 21);
        // If react.strictmode in main.jsx is not enabled the proper bg url might not work because url.backdrop will show up as undefined
        const path = url.backdrop + data?.results[random]?.backdrop_path;
        setBg(path);
    }, [url?.backdrop, data?.results])

    const onSearch = (e) => {
        if (e.key === "Enter" || e.onClick) {
            window.scrollTo(0, 0);
            navigate(`/search/${input}`);
            setInput("");
        }
    }

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

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
                        <button onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/search/${input}`);
                            setInput("");
                        }}>Search</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HeroBanner
