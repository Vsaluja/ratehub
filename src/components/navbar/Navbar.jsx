import React, { useEffect, useState } from 'react'
import './style.scss'
import Container from '../Container/Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/moviesLogo2.png'


const Navbar = () => {

    const [mobile, setMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const location = useLocation();

    const handleMobile = () => {
        setMobile((prev) => !prev)
        setSearch(false);
    }

    const handleSearch = () => {
        setSearch((prev) => !prev);
        setMobile(false);
    }

    const onSearch = (e) => {
        if (e.key === "Enter") {
            
            handleSearch()
            window.scrollTo(0, 0);
            navigate(`/search/${input}`)
            setInput("");
        }
    }


    useEffect(()=>{
        if(search){
            setSearch(false);
        }

        if(mobile){
            setMobile(false);
        }

    }, [location])



    return (
        <div className='navbar'>
            <Container>
                <Link className='logo' to="/">
                    <img src={logo} alt="" />
                </Link>

                <div className={`navItems ${mobile ? "active" : ""}`}>
                    <i className="ri-search-line" onClick={handleSearch} />

                    <Link to={`/explore/movie`}>Movies</Link>
                    <Link to={`/explore/tv`}>TV Shows</Link>
                </div>

                <div className="nav-phone">

                    <i className="ri-search-line" onClick={handleSearch} />
                    <i className="ri-menu-3-line" onClick={handleMobile} />

                </div>

                {search &&
                    (
                        <div className="search">

                            <input
                                className='searchField'
                                placeholder='Looking for a Movie or TV Show ?'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => onSearch(e)}
                            />
                            <span className='close' onClick={handleSearch}>X</span>
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

export default Navbar
