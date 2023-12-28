import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../API/API';

const useFetch = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setLoading("Loading..");
        setData(null);
        setError(null);


        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            })
            .catch((error) => {
                setLoading(false)
                setError("Something went wrong")
                console.log(error);
            })

    }, [url])

    return { data, loading, error }
}

export default useFetch
