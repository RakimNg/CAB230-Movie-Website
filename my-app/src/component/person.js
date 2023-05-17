import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Navigation } from './nav'
export const PersonPage = () => {
    // const [data, setData] = useState([])

    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const ID = localStorage.getItem("personID")
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${encodeURIComponent(ID)}`, {
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
    }, [])
    const mapData = () => {
        const roles_arr = headlines?.roles
        if (!headlines || !roles_arr) return null;
        return (
            < div class="text-center">

                <p>Name: {headlines.name}</p>
                <p>Birth Year: {headlines.birthYear}</p>

                {headlines.deathYear && <p>Death Year:{headlines.deathYear}</p>}
                <p>Movies Performed:</p>
                <table className='table'>
                    <thead >
                        <tr className='danger'>

                            <th>Movie Name</th>
                            <th>Movie ID</th>
                            <th>Category</th>
                            <th>Character</th>
                            <th>IMDB Rating</th>
                            {console.log(roles_arr)}
                        </tr>
                    </thead>
                    <tbody>
                        {roles_arr.map((role) => (

                            <tr key={role.movieId} className='table-info'>
                                <th> {role.movieName}</th>
                                <th><Link to={`/movie/${role.movieID}`} onClick={() => {
                                    localStorage.setItem("imdbID", role.movieId);
                                }} >{role.movieId}</Link></th>
                                <th>{role.category}</th>
                                {role.characters && <th>{role.characters}</th>}
                                <th> {role.imdbRating}</th>


                            </tr>

                        ))}
                    </tbody>
                </table>
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
            <div>
                {mapData()}

            </div>
        </div >

    )
}