import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
export const LogOutPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const logOut = async () => {
        console.log("hello")
        const token = localStorage.getItem("refreshToken")

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
            const data1 = await response.json()




        }
        catch (error) {
            setError(error)
            console.log(error)
        }
        finally {
            setLoading(false)
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("token")
            console.log(localStorage.getItem("token"))
        }
    }
    logOut()
    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    return (
        <div>
            <h5>
                You have log out!
            </h5>

            <Link to="/">
                Back to Homepage
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/login">
                Login
            </Link>

        </div>
    )
}