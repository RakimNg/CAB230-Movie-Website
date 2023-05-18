
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationLink, PaginationItem } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './nav';

export function MoviesLib() {
    const [records, setRecords] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [headlines, setHeadlines] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?page=${encodeURIComponent(page)}`);
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
                    <td><Link to={`/movie/${prop.imdbID}`}>{prop.imdbID}</Link></td>
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

