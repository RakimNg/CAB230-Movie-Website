import { MoviesLib } from './library';
import { Navigation } from './nav';
import { Button, Alert } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
export const MoviePage = () => {
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const ID = localStorage.getItem("imdbID")
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);
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
        const timestamp = localStorage.getItem("timestamp")
        const new_timestamp = Date.now()
        const token = localStorage.getItem("token")
        if (!headlines || !principals_arr || !ratings_arr || !genres_arr) {
            return null;
        }
        if (!token || new_timestamp - timestamp > 600000) {
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("token")
            console.log(`token expired, time stamp: ${timestamp}, new stamp: ${new_timestamp}`)
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
                    <table className='table'>
                        <thead >
                            <tr className='danger'>

                                <th>ID</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Characters</th>
                            </tr>
                        </thead>
                        <tbody>
                            {principals_arr.map((principal) => (

                                <tr key={principal.id} className='table-info'>

                                    <th>{principal.id}</th>
                                    <th>{principal.category}</th>
                                    <th>{principal.name} </th>
                                    <th>{principal.characters}</th>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>




            );
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
                <table className='table'>
                    <thead >
                        <tr className='danger'>

                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Characters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {principals_arr.map((principal) => (

                            <tr key={principal.id} className='table-info'>

                                <th><Link to={`/person/${principal.id}`} onClick={() => {


                                    localStorage.setItem("personID", principal.id);


                                }} >{principal.id}</Link></th>
                                <th>{principal.category}</th>
                                <th>{principal.name} </th>
                                <th>{principal.characters}</th>

                            </tr>
                        ))}
                    </tbody>
                </table>

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







