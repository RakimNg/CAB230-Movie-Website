import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../CSS/RegisterAndLogin.css'
export const LogOutPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [tokenState, SetTokenState] = useState()
    const [logoutState, SetLogoutState] = useState()
    const [http, setHttp] = useState()

    useEffect(() => {
        const logOut = async () => {
            console.log("hello")
            const token = localStorage.getItem("refreshToken")
            console.log(token)
            const token2 = localStorage.getItem("token")
            console.log(token)
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/user/logout`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refreshToken: token
                    })
                })
                console.log(response.status)
                const data1 = await response.json()
                setHttp(response.status)

                // if (response.status === 200) {
                //     SetLogoutState(true)
                //     console.log(logoutState)

                // }
                // if (response.status === 400) {
                //     SetLogoutState(false)
                //     console.log(logoutState)
                // }



            }
            catch (error) {
                SetLogoutState(false)
                setError(error)
                console.log(error)
            }
            finally {
                setLoading(false)
                SetTokenState(token2)


            }
        }
        logOut()
        // console.log(http)
        // if (http === 200) {
        //     SetLogoutState(true)
        //     console.log(logoutState)

        // }
        // if (http === 400) {
        //     SetLogoutState(false)
        //     console.log(logoutState)
        // }


    }, [])
    useEffect(() => {
        console.log(http)
        if (http === 200) {
            SetLogoutState(true)
            console.log(logoutState)
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("token")

        }
        if (http === 400) {
            SetLogoutState(false)
            console.log(logoutState)
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("token")
        }
    }, [http])

    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    if (!tokenState && logoutState == false) {

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* // <div style={{ justifyContent: 'center' }}> */}

                    <img src='https://i.pinimg.com/564x/33/42/e4/3342e4ba684ff017acff7382cad86c7f.jpg' alt='401 error' ></img>
                </div>




                <div style={{ justifyContent: 'center', display: 'flex' }}>

                    <h4>You need to <Link to="/login">Login</Link> to access this page</h4>

                </div>
            </div>
        )





    }
    if (logoutState == true && tokenState) {
        return (
            <div className='page-container'>
                <div className='panel'>
                    <h5>
                        You have log out!
                    </h5>
                    <p>


                        <Link to="/">
                            Back to Homepage
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        )
    }

}