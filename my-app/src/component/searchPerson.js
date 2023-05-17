import { Navigation } from './nav';
import { Nav, NavItem, NavLink, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
export const SearchPerson = () => {
    const [records, setRecords] = useState([])
    const [data, setData] = useState([])
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        setData(records)


    }
    const handleInputChange = (event) => {
        setRecords(event.target.value);
        console.log(typeof event.target.value)
        console.log(records)
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${encodeURIComponent(data)}`, {
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
    }, [data])
    const join = (array) => {
        if (!array) {
            return null
        }
        const updated = array.join(" , ")
        // console.log(updated)
        return updated
    }
    const getName = (roles_arr) => {
        const desiredLength = 5
        let nameArr = []
        for (let i = 0; i < roles_arr.length; i++) {
            nameArr.push(roles_arr[i].movieName)

        }
        if (roles_arr.length > 5) {
            nameArr = nameArr.slice(0, desiredLength)
        }

        const newNameArr = join(nameArr)
        return newNameArr
    }

    const mapData = () => {

        const roles_arr = headlines?.roles
        if (!headlines || !roles_arr) return null;

        return (


            <Card className="my-2">
                <CardBody>
                    <CardTitle tag="h5">
                        {headlines.name}
                    </CardTitle>
                    <CardText>
                        Movies participated: {getName(roles_arr)}...
                    </CardText>

                    <CardText style={{ display: "flex", justifyContent: "space-between" }}>
                        <small className="text-muted">
                            roles: ...
                        </small>
                        <Link to={`/person/${data}`} onClick={() => {
                            localStorage.setItem("personID", data);
                        }} >View</Link>
                    </CardText>

                </CardBody>

            </Card>










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


            <div className='p-5 bg-light'>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <input type="text" className='form-control' value={records} onChange={handleInputChange} placeholder='Search people imdbID' />
                        <button type="submit">Search</button>

                    </div>
                </form>

                <div>
                    {mapData()}

                </div>
            </div >
        </div>

    )
}
