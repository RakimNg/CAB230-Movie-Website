import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Navigation } from './nav'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PureComponent } from 'react';
import '../CSS/chart.css'
export const PersonPage = () => {
    // const [data, setData] = useState([])

    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [boxoffices, setBoxoffices] = useState([])
    const [years, setYears] = useState([])
    const [status, setStatus] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        const data = years.map((year, index) => ({
            year: year,
            boxoffice: boxoffices[index]
        }));
        console.log(data)
        setData(data)
    }, [boxoffices, years])

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
    const fetchMoreData = async (ID_arr) => {
        const boxofficeArray = [];
        const yearArray = [];
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        console.log(ID_arr);

        const tempArray = []; // Temporary array to store fetched data

        for (const id of ID_arr) {
            console.log(id);
            console.log("hello");
            try {
                await delay(100);
                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${id}`);
                const data = await res.json();
                tempArray.push(data); // Add fetched data to temporary array
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        for (const data of tempArray) {
            let matchFound = false; // Flag variable to track if a match was found

            for (let i = 0; i < yearArray.length; i++) {
                if (data.year == yearArray[i]) {
                    console.log("this is all year Arr: " + yearArray);
                    console.log("upcoming year: " + data.year + " existing year: " + yearArray[i]);
                    boxofficeArray[i] += data.boxoffice;
                    console.log("The result of two box office plus: " + boxofficeArray[i]);
                    matchFound = true;
                    break; // Exit the loop since a match was found
                }
            }

            if (!matchFound) {
                console.log("when two year is not equal: yearArr: " + yearArray + " dataYear: " + data.year);
                console.log("when two year is not equal, boxoffice: " + boxofficeArray);
                yearArray.push(data.year);
                boxofficeArray.push(data.boxoffice);
            }
        }
        setBoxoffices(boxofficeArray)
        setYears(yearArray)
        console.log(boxofficeArray);
        console.log(yearArray);
    };
    const mapData = () => {
        const roles_arr = headlines?.roles
        const ID_arr = []
        const movieYearArr = []
        if (!headlines || !roles_arr) return null;
        if (roles_arr && status == false) {
            for (const role of roles_arr) {
                ID_arr.push(role.movieId)
                // console.log(role)
            }
            console.log(ID_arr)
            // setData(ID_arr)
            fetchMoreData(ID_arr)
            setStatus(true)
        }

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
                        </tr>
                    </thead>
                    <tbody>
                        {roles_arr.map((role) => (
                            <tr key={role.movieId} className='table-info'>
                                <th> {role.movieName}</th>
                                <th><Link to={`/movie/${role.movieId}`} onClick={() => {
                                    console.log(role.movieId);
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
                <div class="linearchart">


                    <LineChart
                        width={1200} // Increase the width
                        height={500} // Increase the height
                        data={data.sort((a, b) => a.year - b.year)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" angle={-45} />
                        <YAxis angle={-75} />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="boxoffice" stroke="#82ca9d" />
                    </LineChart>
                </div>

            </div>
        </div >

    )
}