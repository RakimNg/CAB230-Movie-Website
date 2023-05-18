import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from './404';
import { Spinner } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Navigation } from './nav'
import randomColor from 'randomcolor';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
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
    const [data1, setData1] = useState([])
    const [UniqueGenres, setUniqueGenres] = useState([])
    const [OccuranceTimes, setOccuranceTimes] = useState([])
    const { imdbID } = useParams('imdbID')
    const [notFound, setNotFound] = useState(false)
    const [finish, setFinish] = useState(false)


    useEffect(() => {
        const data = years.map((year, index) => ({
            year: year,
            boxoffice: boxoffices[index]
        }));
        console.log(data)
        setData(data)
    }, [boxoffices, years])


    useEffect(() => {
        const data1 = UniqueGenres.map((genre, index) => ({
            genre: genre,
            times: OccuranceTimes[index]
        }));
        console.log(data1)
        setData1(data1)
    }, [UniqueGenres, OccuranceTimes])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const ID = localStorage.getItem("personID")
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${encodeURIComponent(imdbID)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                })
                if (response.status == 404) {
                    setNotFound(true)
                }


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
    function countOccurrences(arr, element) {
        return arr.reduce((count, current) => {
            if (current === element) {
                count++;
            }
            return count;
        }, 0);
    }
    const fetchMoreData = async (ID_arr) => {
        const boxofficeArray = [];
        const yearArray = [];
        // const repeatYearArr = []
        const genreArray = []
        // const ratingArray = []
        // const averageRatingArray = []
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        console.log(ID_arr);

        const tempArray = []; // Temporary array to store fetched data

        for (const id of ID_arr) {
            // console.log(id);
            // console.log("hello");
            try {
                await delay(50);
                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${id}`);
                const data = await res.json();
                tempArray.push(data); // Add fetched data to temporary array
            } catch (error) {
                if (error.response && error.response.status == 401) {
                    setError("unauthorized access, please log in")
                }
                else {
                    setError(error);

                }
            } finally {
                setLoading(false);
            }
        }

        for (const data of tempArray) {
            genreArray.push(data.genres)

            let matchFound = false; // Flag variable to track if a match was found

            for (let i = 0; i < yearArray.length; i++) {
                if (data.year == yearArray[i]) {
                    // console.log("this is all year Arr: " + yearArray);
                    // console.log("upcoming year: " + data.year + " existing year: " + yearArray[i]);
                    boxofficeArray[i] += data.boxoffice;
                    // ratingArray[i] += data.ratings[0].value
                    // console.log("data is: " + data.ratings[0].value)
                    // repeatYearArr.push(data.year);
                    // yearArray.push(data.year);
                    // console.log("The result of two box office plus: " + boxofficeArray[i]);
                    matchFound = true;
                    break; // Exit the loop since a match was found
                }
            }

            if (!matchFound) {
                // console.log("when two year is not equal: yearArr: " + yearArray + " dataYear: " + data.year);
                // console.log("when two year is not equal, boxoffice: " + boxofficeArray);
                yearArray.push(data.year);
                boxofficeArray.push(data.boxoffice);
                // repeatYearArr.push(data.year)
                // ratingArray.push(data.ratings[0].value)
            }
        }
        setBoxoffices(boxofficeArray)
        // setYears(yearArray)
        const flattenedArray = genreArray.flat(Infinity);
        let uniqueGenres = Array.from(new Set(flattenedArray));
        // let uniqueYears = Array.from(new Set(yearArray))
        let occurancetimes = []
        // let occuranceYears = []
        // console.log("unique years:" + uniqueYears)
        console.log("genres array: " + uniqueGenres)
        for (const genre of uniqueGenres) {
            let occurrences = countOccurrences(flattenedArray, genre);

            occurancetimes.push(occurrences)
        }
        // for (const year of uniqueYears) {
        //     let occurrencesY = countOccurrences(yearArray, year)
        //     occuranceYears.push(occurrencesY)
        // }

        setUniqueGenres(uniqueGenres)
        setOccuranceTimes(occurancetimes)
        // console.log(occuranceYears)
        // console.log(ratingArray)
        // for (let i = 0; i < ratingArray.length; i++) {
        //     averageRatingArray.push(ratingArray[i] / occuranceYears[i])
        // }
        setYears(yearArray)
        // for (const genre of uniqueGenres) {
        //     console.log(genre)
        // }
        // console.log(boxofficeArray);
        // console.log(yearArray);
        setFinish(true)
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
                {headlines.birthYear && <p>Birth Year:{headlines.birthYear}</p>}

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
    if (notFound) {
        return (
            <div>
                <PageNotFound />
            </div>
        )
    }
    if (!finish) {
        return (
            <div>
                <Navigation />
                {mapData()}
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading the charts, please wait...</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    &nbsp;&nbsp;
                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                    &nbsp;&nbsp;
                    <Spinner
                        color="primary"
                        type="grow"
                    >
                        Loading...
                    </Spinner>
                </div>
            </div>
        )
    }
    return (

        <div>
            <Navigation />
            <div>
                {mapData()}
                <div class="linearchart">


                    <LineChart
                        width={650}
                        height={500}
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
                    <BarChart
                        width={650}
                        height={500}
                        data={data1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="genre" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="times" fill="#8884d8" />
                    </BarChart>





                </div>

            </div>
        </div >

    )
}