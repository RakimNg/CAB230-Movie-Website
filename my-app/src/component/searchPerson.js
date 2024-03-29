import { Navigation } from './nav';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export const SearchPerson = () => {
    const [records, setRecords] = useState([])
    const [data, setData] = useState([])
    const [headlines, setHeadlines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [tokenState, setTokenState] = useState()

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
            setTokenState(token)
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/people/${encodeURIComponent(data)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                })

                if (response.status === 401) {
                    setError('You do not have access for that.')
                }
                const data1 = await response.json()

                setHeadlines(data1)


            }

            catch (error) {


                setError(error.message)
                console.log(error.message)

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
    const getRole = (roles_arr) => {
        let roles = []
        for (let i = 0; i < roles_arr.length; i++) {
            roles.push(roles_arr[i].category)

        }
        let uniqueRoles = Array.from(new Set(roles));
        const newRoles = join(uniqueRoles)
        return newRoles
    }
    const getName = (roles_arr) => {
        // const desiredLength = 5
        let nameArr = []
        for (let i = 0; i < roles_arr.length; i++) {
            if (i >= 5) {
                if (roles_arr.length > 6) {
                    nameArr.push(roles_arr[i].movieName + "...")
                    break
                }
                nameArr.push(roles_arr[i].movieName)
                break

            }
            nameArr.push(roles_arr[i].movieName)
            console.log(nameArr)

        }
        const newNameArr = join(nameArr)
        console.log(newNameArr)
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
                        Movies participated: {getName(roles_arr)}
                    </CardText>

                    <CardText style={{ display: "flex", justifyContent: "space-between" }}>
                        <small className="text-muted">
                            Roles: {getRole(roles_arr)}
                        </small>
                        <Link to={`/person/${data}`}>View</Link>
                    </CardText>

                </CardBody>

            </Card>


        )

    }
    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return (
            <div style={{ display: 'flex' }}>
                <p>Something went wrong: {error} </p>
                <Link to="login">
                    login here
                </Link>
            </div>
        )

    }

    return (

        <div>
            <Navigation />

            {tokenState && <div className='p-5 bg-light'>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <input type="text" className='form-control' value={records} onChange={handleInputChange} placeholder='Search people imdbID' />
                        <button type="submit">Search</button>

                    </div>
                </form>

                <div>
                    {mapData()}

                </div>
            </div >}
            {!tokenState &&

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <img src='https://i.pinimg.com/564x/33/42/e4/3342e4ba684ff017acff7382cad86c7f.jpg' alt='401 error' ></img>
                </div>



            }
            {!tokenState &&

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h4>You need to <Link to="/login">Login</Link> to access this page</h4>

                </div>



            }

        </div>

    )
}
