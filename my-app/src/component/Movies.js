
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './base';

export function ResultPage() {
    const location = useLocation();
    const { data } = location.state;

    return (
        <div>
            <h1>Result</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export function Headline(props) {
    const [records, setRecords] = useState([])
    const [error, setError] = useState(null);
    const [headlines, setHeadlines] = useState([null])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const Filter = (event) => {

        // console.log(Number(event.target.value) - 2)
        // else {
        setRecords(props.data.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase())))
        // }
        console.log(records)
    }
    const handleClick = async (imdbID) => {
        console.log(loading)
        // setLoading(true);
        const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${encodeURIComponent(imdbID)}`)
        const data = await response.json();
        const country = await data.country;
        setLoading(false);
        setHeadlines(country)
        console.log(headlines)

    }
    const mapData = () => {
        return (

            records.map((prop) => (

                <tr key={prop.imdbID} >
                    {/* <td>{console.log(prop)}</td> */}
                    <td>{prop.title}</td>
                    <td>{prop.year}</td>
                    <td>{prop.imdbRating}</td>
                    <td>{prop.classification}</td>
                    <td>{prop.imdbID}</td>
                    {/* <Link to={`/movie/`}> */}
                    <td><Button color="primary" onClick={() => {
                        // setHeadlines(prop.imdbID)
                        // setHeadlines(prop.imdbID)

                        // .then(handleClick()) 
                        // MoviePage(prop.imdbID)
                        console.log(typeof prop.year)
                        handleClick(prop.imdbID)
                        // FetchData(prop.imdbID)
                    }




                    }>
                        Details
                    </Button></td>
                    <td>

                    </td>
                    {/* {loading && <p>Loading...</p>}
                    {
                        headlines && (
                            // <Link to={{ pathname: "/result", state: { headlines } }}>View Result</Link>
                            <p>{headlines}</p>
                        )
                    } */}

                </tr>

            )
            )

        )

    }

    return (
        <div className='p-5 bg-light'>
            <div className='bg-white shadow border'>
                <div style={{ display: 'flex' }}>
                    <input type="text" className='form-control' onChange={Filter} placeholder='Search movie name' />
                    <Link to={`/movie/`}>
                        <Button color="primary" onClick={() => {


                        }




                        }>
                            Search with imdbID
                        </Button>
                    </Link>
                    <Link to={`/person/`}>
                        <Button color="danger" onClick={() => {


                        }




                        }>
                            Search people
                        </Button>
                    </Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>

                            <th>Title</th>
                            <th>Year</th>
                            <th>imdbRating</th>
                            <th>Classification</th>
                            <th>imdbID</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapData()}


                    </tbody>
                </table >
            </div >



        </div >


    )
}






export const renderComponent = (country) => {
    console.log(typeof country)
    return (
        <div>
            <p>
                The Country is: {country}
            </p>
        </div>
    )
}
export function DisplayData() {
    const [loaded, setLoaded] = useState(false);
    const [headlines, setHeadlines] = useState([])
    setLoaded(true)
    console.log(loaded)
}


// }

const useData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headlines, setHeadlines] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/search?title=a');
                const data = await res.json();
                const dataArray = data;

                setHeadlines(dataArray);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { loading, error, headlines };
};



export function MoviesLib() {


    const { loading, error, headlines } = useData();
    if (loading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }

    return (<div>

        <Navigation />
        <header>Welcome to movies library</header>

        <Headline{...headlines} />

        {/* <p>{title}</p> */}

    </div>)

}
