import { Navigation } from './base';
import { Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const PersonPage = () => {
    const [records, setRecords] = useState([])
    const [data, setData] = useState([])
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        // setLoading(true)
        event.preventDefault();
        setData(records)
        // fetchData(data)


    }
    const handleInputChange = (event) => {
        setRecords(event.target.value);
        console.log(typeof event.target.value)
        console.log(records)
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")

            console.log(token)
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${encodeURIComponent(data)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                })
                const data1 = await response.json()

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
        fetchData()
    }, [data])
    const join = (array) => {
        if (!array) {
            return null
        }
        const updated = array.join(" , ")
        console.log(updated)
        return updated
    }
    const mapData = () => {

        const roles_arr = headlines?.roles

        // const characters_arr = headlines?.roles.characters
        if (!headlines || !roles_arr) return null;

        return (
            < div class="text-center">

                <p>Name: {headlines.name}</p>
                <p>Birth Year: {headlines.birthYear}</p>

                {headlines.deathYear && <p>Death Year:{headlines.deathYear}</p>}
                <p>Movies Performed:</p>
                {roles_arr.map((role) => (
                    <p>Movie Name: {role.movieName} MovieID: {role.movieID} Category: {role.category}  {role.characters && <p>Characters: {role.characters}</p>} imdbRating: {role.imdbRating}</p>

                ))}

            </div>
        )

    }
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
                        <input type="text" className='form-control' value={records} onChange={handleInputChange} placeholder='Search people imdbID' />
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
