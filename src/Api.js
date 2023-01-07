import axios from "axios"

export const getTvList = async () => {
    const tv = await axios.get(`${process.env.REACT_APP_BASEURL}/tv/popular?page=1&api_key=${process.env.REACT_APP_APIKEY}`)
    return tv.data.results
}

export const getMovieList = async () => {
    const movie = await axios.get()
    return movie.data.results
}

export const searchTv = async (q) => {
    const search = await axios.get(`${process.env.REACT_APP_BASEURL}/search/tv?query=${q}&page=1&api_key=${process.env.REACT_APP_APIKEY}`)
    return search.data
}