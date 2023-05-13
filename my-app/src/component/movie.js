import { MoviesLib } from './Movies';
import { Navigation } from './base';
import { Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
export const MoviePage = () => {
    const [records, setRecords] = useState([])
    const [data, setData] = useState([])
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const handleInputChange = (event) => {
        setRecords(event.target.value);
        console.log(typeof event.target.value)
        console.log(records)
    }
    const handleSubmit = (event) => {
        // setLoading(true)
        event.preventDefault();
        setData(records)
        // fetchData(data)


    }
    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${encodeURIComponent(data)}`)
                    const data1 = await response.json();
                    // const country = await data1.country;

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
        }, [data]

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
        console.log(principals_arr)
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
    // fetchData();

    // }, [data])
    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div>
            <Navigation />


            <div className='p-5 bg-light'>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <input type="text" className='form-control' value={records} onChange={handleInputChange} placeholder='Search movie imdbID' />
                        <button type="submit">Search</button>
                    </div>
                </form>

                <div>
                    {mapData()}

                </div>
                {/* {} */}
                {/* {headlines && <p>{headlines.title}</p> && <p>{headlines.year}</p> && <p>{headlines.country}</p> && mapPrincipals()} */}

            </div >
        </div>

    )
}







