
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Navigation } from './base';


function Headline(props) {
    const [records, setRecords] = useState([])
    const [error, setError] = useState(null);
    const Filter = (event) => {
        setRecords(props.data.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase())))

    }

    return (
        <div className='p-5 bg-light'>
            <div className='bg-white shadow border'>
                <input type="text" className='form-control' onChange={Filter} placeholder='Search movie name' />
                <table className='table'>
                    <thead>
                        <tr>

                            <th>Title</th>
                            <th>Year</th>
                            <th>imdbRating</th>
                            <th>Classification</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>


                        {records.map((prop) => (

                            <tr key={prop.imdbID} >
                                {/* <td>{console.log(prop)}</td> */}
                                <td>{prop.title}</td>
                                <td>{prop.year}</td>
                                <td>{prop.imdbRating}</td>
                                <td>{prop.classification}</td>
                                <Link to={`/movie/`}>
                                    <td><Button color="primary" onClick={() => {
                                        FetchData(prop.imdbID)


                                    }


                                    }>
                                        Details
                                    </Button></td>
                                </Link>
                            </tr>

                        ))}
                    </tbody>
                </table >
            </div >



        </div >


    )
}
export async function FetchData(imdbID) {

    try {
        const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${encodeURIComponent(imdbID)}`)
        const data = await response.json();
        const country = data.country;
        console.log(country);
        // MoviePage(country);





    }
    catch (error) {

        console.log("captured")
    }




}
export const MoviePage = () => {

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
