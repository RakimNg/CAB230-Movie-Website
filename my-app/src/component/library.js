import React, { useEffect, useState } from 'react';
import { Pagination, PaginationLink, Spinner, PaginationItem, Table } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from './nav';

export function MoviesLib() {
    const [input, setInput] = useState()
    const [records, setRecords] = useState([])
    const [data, setData] = useState()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [headlines, setHeadlines] = useState('');
    const [page, setPage] = useState(1)
    const [lastpage, setLastPage] = useState()
    const navigate = useNavigate()
    const regex = /^tt\d{7}$/;
    const handleInputChange = (event) => {
        setInput(event.target.value)
        if (input == '') {
            setRecords(data)
            console.log(headlines)
        }
        else {

            setRecords(data.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase())))
        }


    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (regex.test(input)) {
            navigate(`/movie/${input}`)
        }
        setPage(1)

        setHeadlines(input)

    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {

                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?title=${(headlines)}&page=${page}`);

                const data = await res.json();
                const dataArray = data;
                const pages = dataArray.pagination
                setLastPage(pages.lastPage)
                setRecords(dataArray.data)
                setData(dataArray.data)
                console.log(dataArray)

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie()
    }, [headlines, page])

    const handleFirstPageClick = () => {
        setPage(1)
    }
    const handleLastPageClick = () => {
        setPage(lastpage)
    }
    const handleNextPageClick = () => {
        if (page < lastpage) {
            setPage(page + 1)

        }
    }
    const handlePreviousPageClick = () => {
        if (page > 1) {
            setPage(page - 1)

        }
    }

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
        return (

            <p>Something went wrong: {error.message}</p>);
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



                    <Table striped bordered>
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
                    </Table>
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

