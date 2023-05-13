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

    const mapPrincipals = () => {
        const principals_arr = headlines?.principals
        console.log(principals_arr)
        if (!headlines || !principals_arr) {
            return null;
        }
        return (


            <div>
                <p>{headlines.title}</p>
                <p>{headlines.year}</p>
                <p>{headlines.country}</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={headlines.poster} alt="Image description"></img>
                </div >
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
        <div className='p-5 bg-light'>
            <form onSubmit={handleSubmit}>
                <input type="text" className='form-control' value={records} onChange={handleInputChange} placeholder='Search movie name' />
                <button type="submit">Search</button>

            </form>
            <div>
                {mapPrincipals()}

            </div>
            {/* {} */}
            {/* {headlines && <p>{headlines.title}</p> && <p>{headlines.year}</p> && <p>{headlines.country}</p> && mapPrincipals()} */}

        </div >

    )
}







