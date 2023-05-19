import React, { useEffect, useState } from 'react';
import { Pagination, PaginationLink, Spinner, PaginationItem } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './nav';

export function MoviesLib() {
    const [input, setInput] = useState()
    const [records, setRecords] = useState([])
    const [data, setData] = useState()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [headlines, setHeadlines] = useState([]);
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const handleInputChange = (event) => {
        const regex = /^tt\d{7}$/;

        if (regex.test(event.target.value)) {
            navigate(`/movie/${event.target.value}`)
            event.preventDefault()

        }
        console.log(event.target.value)
        setInput(event.target.value)
    }
    const handleSubmit = (event) => {

        event.preventDefault()
        setHeadlines(input)

    }
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?title=${encodeURIComponent(headlines)}`);
                const data = await res.json();
                const dataArray = data;
                setRecords(dataArray.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie()
    }, [headlines])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?page=${encodeURIComponent(page)}`);
                const data = await res.json();
                const dataArray = data;

                // setHeadlines(dataArray);
                setRecords(dataArray.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [page]);
    const handleFirstPageClick = () => {
        setPage(1)
        // window.scrollTo({ top: 0, behavior: 'auto' });
    }
    const handleLastPageClick = () => {
        setPage(122)
        // window.scrollTo({ top: 0, behavior: 'auto' });
    }
    const handleNextPageClick = () => {
        setPage(page + 1)
        // window.scrollTo({ top: 0, behavior: 'auto' });
    }
    const handlePreviousPageClick = () => {
        setPage(page - 1)
        // window.scrollTo({ top: 0, behavior: 'auto' });
    }
    // return { loading, error, headlines };
    // };

    // const Filter = (event) => {
    //     const regex = /^tt\d{7}$/;
    //     if (regex.test(event.target.value)) {

    //         setRecords(headlines.data.filter(f => f.imdbID === event.target.value))
    //     }
    //     else {
    //         setRecords(headlines.data.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase())))

    //     }
    //     // }
    //     console.log(records)
    // }
    const mapData = () => {
        return (

            records.map((prop) => (

                <tr key={prop.imdbID} >
                    <td>{prop.title}</td>
                    <td>{prop.year}</td>
                    <td>{prop.imdbRating}</td>
                    <td>{prop.classification}</td>
                    <td><Link to={`/movie/${prop.imdbID}`}>{prop.imdbID}</Link></td>
                    <td>

                    </td>


                </tr>

            )
            )

        )

    }
    if (loading) {
        return (<div>
            <Navigation />
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading the data, please wait...</p>
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

    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div>
            <Navigation />
            <div className='p-5 bg-light'>
                <div className='bg-white shadow border'>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex' }}>
                            <input type="text" className='form-control' onChange={handleInputChange} placeholder='Search movie name or movie ID' />
                            <button type="submit">Search</button>

                        </div>
                    </form>



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
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Pagination aria-label="Page navigation example">
                            <PaginationItem>
                                <PaginationLink onClick={handleFirstPageClick}
                                    first
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={handlePreviousPageClick}
                                    previous
                                />
                            </PaginationItem>
                            <PaginationItem active>
                                <PaginationLink to="#">
                                    {page}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink onClick={handleNextPageClick}
                                    next
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={handleLastPageClick}
                                    last
                                />
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div >



            </div >

        </div>


    )
}

