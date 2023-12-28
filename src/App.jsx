import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { useEffect } from 'react'
import useFetch from './Hooks/useFetch'
import { fetchDataFromApi } from './API/API'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './Store/HomeSlice'
import Explore from './pages/Explore/Explore'
import Search from './pages/Search/Search'

function App() {
  const dispatch = useDispatch();

  const fetchConfig = async () => {
    const res = await fetchDataFromApi("/configuration");
    const url = {
      backdrop: res?.images?.secure_base_url + "original",
      poster: res?.images?.secure_base_url + "original",
      profile: res?.images?.secure_base_url + "original",
    }

    dispatch(getApiConfiguration(url))
  }

  useEffect(() => {
    fetchConfig();
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/explore/:mediaType' element={<Explore />}></Route>
        <Route path='/search/:query' element={<Search />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
