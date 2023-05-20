import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from './404';
import { Spinner, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Navigation } from './nav'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import '../CSS/chart.css'
export const PersonPage = () => {
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
    const [tokenState, setTokenState] = useState()
    const [error429, setError429] = useState(false)
    const [ChartData, setChartData] = useState([])
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
            setTokenState(token)
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
    useEffect(() => {
        const fetchMoreData = async (ID_arr) => {

            const boxofficeArray = [];
            const yearArray = [];
            const genreArray = []
            console.log(ID_arr);

            const tempArray = [];

            for (const id of ID_arr) {
                try {
                    console.log("func executed")
                    // await delay(50);
                    const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${id}`);
                    if (res.status == 429) {
                        setError429(true)
                    }
                    const data = await res.json();
                    tempArray.push(data);

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

                let matchFound = false;

                for (let i = 0; i < yearArray.length; i++) {
                    if (data.year == yearArray[i]) {

                        boxofficeArray[i] += data.boxoffice;

                        matchFound = true;
                        break;
                    }
                }

                if (!matchFound) {

                    yearArray.push(data.year);
                    boxofficeArray.push(data.boxoffice);

                }
            }
            setBoxoffices(boxofficeArray)
            const flattenedArray = genreArray.flat(Infinity);
            let uniqueGenres = Array.from(new Set(flattenedArray));
            let occurancetimes = []

            console.log("genres array: " + uniqueGenres)
            for (const genre of uniqueGenres) {
                let occurrences = countOccurrences(flattenedArray, genre);

                occurancetimes.push(occurrences)
            }


            setUniqueGenres(uniqueGenres)
            setOccuranceTimes(occurancetimes)

            setYears(yearArray)

            setFinish(true)
        };
        fetchMoreData(ChartData)

    }, [ChartData])

    const mapData = () => {
        const roles_arr = headlines?.roles
        const ID_arr = []
        const movieYearArr = []
        if (!headlines || !roles_arr) return null;
        if (roles_arr && status == false) {
            for (const role of roles_arr) {
                ID_arr.push(role.movieId)
            }
            console.log(ID_arr)

            // fetchMoreData(ID_arr)
            setChartData(ID_arr)
            setStatus(true)
        }

        return (
            < div class="text-center">

                <p>Name: {headlines.name}</p>
                {headlines.birthYear && <p>Birth Year:{headlines.birthYear}</p>}

                {headlines.deathYear && <p>Death Year:{headlines.deathYear}</p>}
                <p>Movies Performed:</p>
                <Table bordered striped>
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
                            <tr key={role.movieId}>
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
                </Table>
            </div>
        )
    }
    if (loading) {
        return <p>loading...</p>;
    }
    if (error429 == true) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src='https://img.freepik.com/free-vector/error-429-concept-illustration_114360-4108.jpg?size=626&ext=jpg&ga=GA1.1.1326508372.1684393841&semt=sph' alt='429 error' ></img>
                </div>
                <div style={{ justifyContent: 'center', display: 'flex' }}>

                    <h4>We are sorry. You sent too many requests. Please come back to this site later.</h4>

                </div>
            </div>
        )


    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    if (!tokenState) {

        return (
            <div>
                <Navigation />
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <img src='https://i.pinimg.com/564x/33/42/e4/3342e4ba684ff017acff7382cad86c7f.jpg' alt='401 error' ></img>
                </div>




                <div style={{ justifyContent: 'center', display: 'flex' }}>

                    <h4>You need to <Link to="/login">Login</Link> to access this page</h4>

                </div>
            </div>
        )





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