import axios from "axios";
import MovieList from "./MovieList";
import { useState, useEffect } from "react";

function Home() {
    const [moviesData, setMoviesData] = useState([]);


    const getAllMovies = () => {

        const serverURL = `https://movies-library-1-hydu.onrender.com/trending`;

            axios.get(serverURL)

                .then(response => {
                    //console.log(response.data);
                    setMoviesData(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
    }
    useEffect(() => {
        getAllMovies();
    }, []);
    return (
        <>
            <MovieList moviesData={moviesData} isFavPage ={false}/>

        </>
    )
}

export default Home;