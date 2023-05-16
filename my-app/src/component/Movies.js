
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './base';

export function MoviesLib() {
    const [records, setRecords] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [headlines, setHeadlines] = useState([]);
    // const navigate = useNavigate()
    // const useData = () => {
        // const [loading, setLoading] = useState(true);
        // const [error, setError] = useState(null);
        useEffect(() => {
            const getData = async () => {
                try {
                    const res = await fetch('http://sefdb02.qut.edu.au:3000/movies/search?title=a');
                    const data = await res.json();
                    const dataArray = data;
    
                    setHeadlines(dataArray);
                    setRecords(dataArray.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
    
            getData();
        }, []);
    
        // return { loading, error, headlines };
    // };

    const Filter = (event) => {
        const regex = /^tt\d{7}$/;
        if (regex.test(event.target.value)) {
            setRecords(headlines.data.filter(f => f.imdbID === event.target.value))
        }
        else {
            setRecords(headlines.data.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase())))

        }
        // }
        console.log(records)
    }
    const mapData = () => {
        return (

            records.map((prop) => (

                <tr key={prop.imdbID} >
                    <td>{prop.title}</td>
                    <td>{prop.year}</td>
                    <td>{prop.imdbRating}</td>
                    <td>{prop.classification}</td>
                    <td><Link to={`/movie/${prop.imdbID}`} onClick={() => {
                        localStorage.setItem("imdbID", prop.imdbID);
                    }} >{prop.imdbID}</Link></td>
                    <td>

                    </td>


                </tr>

            )
            )

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
        <header>Welcome to movies library</header>
        <div className='p-5 bg-light'>
            <div className='bg-white shadow border'>

                <input type="text" className='form-control' onChange={Filter} placeholder='Search movie name or movie ID' />


                <table className='table'>
                    <thead>
                        <tr>

                            <th>Title</th>
                            <th>Year</th>
                            <th>imdbRating</th>
                            <th>Classification</th>
                            <th>imdbID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapData()}


                    </tbody>
                </table >
            </div >



        </div >
        </div>


    )
}






// export function MoviesLib() {


//     const { loading, error, headlines } = useData();
    

//     return (<div>

//         <Navigation />
//         <header>Welcome to movies library</header>

//         <Headline{...headlines} />

//         {/* <p>{title}</p> */}

//     </div>)

// }
