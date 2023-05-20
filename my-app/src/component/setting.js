import React, { useEffect, useState } from 'react';
import { Navigation } from './nav';
import '../CSS/radiobutton.css'
import { Link } from 'react-router-dom';

export const SettingPage = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [tokenStatus, setTokenStatus] = useState()
    console.log(localStorage.getItem("radioButton"))
    const handleSubmit = () => {
        console.log("hello")
        if (selectedOption == "10mins") {
            localStorage.setItem("radioButton", false)
            console.log(localStorage.getItem("radioButton"))
        }
        else {
            localStorage.setItem("radioButton", true)
            console.log(localStorage.getItem("radioButton"))

        }
    }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        setTokenStatus(localStorage.getItem("token"))
        const buttonValue = localStorage.getItem("radioButton")
        console.log(typeof buttonValue)
        if (buttonValue == 'true') {
            setSelectedOption('never')
        }
        else if (buttonValue == 'false') {
            setSelectedOption('10mins')
        }
    }, [])
    if (!tokenStatus) {

        return (
            <div>
                <Navigation />
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <img src='https://i.pinimg.com/564x/33/42/e4/3342e4ba684ff017acff7382cad86c7f.jpg' alt='401 error' ></img>
                </div>




                <div style={{ justifyContent: 'center', display: 'flex' }}>

                    <h4>You need to <Link to="/login">Login</Link> to access this page</h4>

                </div>
            </div>
        )





    }
    return (
        <div>
            <Navigation />
            <div className="setting-container">
                <div className="setting-panel">
                    <h2>Login Expires in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="radio-container">
                            <label>
                                <input
                                    type="radio"
                                    name="options"
                                    value="10mins"
                                    checked={selectedOption == '10mins'}
                                    onChange={handleOptionChange}
                                />
                                Every 10 minutes
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="options"
                                    value="never"
                                    checked={selectedOption == 'never'}
                                    onChange={handleOptionChange}
                                />
                                Never
                            </label>


                        </div>
                        <button >Save</button>
                    </form>
                </div>
            </div>
        </div>

    );
}


