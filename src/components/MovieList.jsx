import ModalMovie from "./ModalMovie";
import { useState, useEffect } from "react";
import Movie from "./Movie";
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from "axios";


function MovieList({ moviesData, isFavPage }) {

    const [show, setShow] = useState(false);
    const [clickedMovie, setClickedMovie] = useState({});


    const handleClose = () => {
        setShow(false)
    }

    const showModal = (item) => {
        setShow(true)
        console.log(item);
        setClickedMovie(item)
    }

    //for render favMovies
    const [moviesFavorite, setMoviesFavorite] = useState([])


    const getAllFavMovies = () => {

        const serverURL = `https://movies-library-1-hydu.onrender.com/getMovies`;


        axios.get(serverURL)
            .then(response => {
                console.log(response.data)
                setMoviesFavorite(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllFavMovies();
    }, [])


    // for delete
    const deleteItem = (item) => {
        let url = `https://movies-library-1-hydu.onrender.com/delete/${item.id}`
        console.log(url);
        axios.delete(url)
            .then(response => {
                console.log(response.data);
                // Filter out the deleted item from moviesFavorite array
                setMoviesFavorite(prevMovies => prevMovies.filter(movie => movie.id !== item.id));
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // for update a comment 
    const updateItem = (item) => {
        showModal(item);



    }








    return (
        
            <>
                {
                    isFavPage && <Row>
                        {moviesFavorite?.map(item => (
                            <Col key={item.id}>
                                <Movie item={item} showModal={showModal} isFavPage={isFavPage} deleteItem={deleteItem} updateItem={updateItem} />
                            </Col>
                        ))}
                        <ModalMovie show={show} handleClose={handleClose} clickedMovie={clickedMovie} isFavPage={isFavPage}  />
                    </Row>
                }
                {
                    !isFavPage && <Row>
                        {moviesData.map(item => (
                            <Col key={item.id}>
                                <Movie item={item} showModal={showModal} />
                            </Col>
                        ))}
                        <ModalMovie show={show} handleClose={handleClose} clickedMovie={clickedMovie} />
                    </Row>
                }
            </>

    );
}

export default MovieList;