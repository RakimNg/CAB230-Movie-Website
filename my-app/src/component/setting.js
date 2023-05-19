import React, { useEffect, useState } from 'react';
import { Navigation } from './nav';
import '../CSS/radiobutton.css'
import { Button } from 'reactstrap';
export const SettingPage = () => {
    const [selectedOption, setSelectedOption] = useState('');
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
        // console.log(event.target.value)
    };
    useEffect(() => {
        const buttonValue = localStorage.getItem("radioButton")
        console.log(typeof buttonValue)
        if (buttonValue == 'true') {
            setSelectedOption('never')
        }
        else if (buttonValue == 'false') {
            setSelectedOption('10mins')
        }
    }, [])
    return (
        <div>
            <Navigation />
            <div className="settings-container">
                <div className="settings-panel">
                    <h2>Login Expire in</h2>
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
                    {/* <button onClick={handleSubmit()}>Save</button> */}
                </div>
            </div>
        </div>

    );
}


