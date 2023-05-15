import { MoviesLib } from './Movies';
import { Navigation } from './base';
import { Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
export const MoviePage = () => {
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const ID = localStorage.getItem("imdbID")

    useEffect(
        () => {
            console.log("hello")
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${encodeURIComponent(ID)}`)
                    const data1 = await response.json();

                    setHeadlines(data1)

                }
                catch (error) {
                    setError(error)
                    console.log(error)
                }
                finally {
                    setLoading(false)
                }


            }
            fetchData();
        }, []

    )
    const join = (array) => {
        const updated = array.join(" & ")
        console.log(updated)
        return updated
    }

    const mapData = () => {
        const principals_arr = headlines?.principals
        const ratings_arr = headlines?.ratings
        const genres_arr = headlines?.genres
        if (!headlines || !principals_arr || !ratings_arr || !genres_arr) {
            return null;
        }


        return (

            <div class="text-center">
                <p>Title: {headlines.title}</p>
                <p>Year: {headlines.year}</p>
                <p>Country: {headlines.country}</p>
                <p>Plot Description: {headlines.plot}</p>
                <p>Genres: {join(genres_arr)}</p>
                <p>Boxoffice: {headlines.boxoffice}</p>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={headlines.poster} alt="Image description"></img>
                </div >
                <p>Ratings:</p>
                {ratings_arr.map((rating, index) => (
                    <div key={index}>
                        <p>{index + 1}.{rating.source}: {rating.value}</p>

                    </div>
                ))}
                <p>Characters:</p>
                {principals_arr.map((principal) => (
                    <div key={principal.id}>
                        <p>ID: {principal.id} Category: {principal.category} Name: {principal.name} Character: {principal.character}</p>

                    </div>
                ))}


            </div>




        );









    };

    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }


    return (
        <div>
            <Navigation />
            <div>
                {mapData()}

            </div>
        </div >

    )


}







