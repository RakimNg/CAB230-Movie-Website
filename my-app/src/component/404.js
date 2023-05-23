import React from "react";
import { Navigation } from './nav';
export const PageNotFound = () => {

    return (

        <div>
            <Navigation />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7871.jpg?w=1380&t=st=1684393871~exp=1684394471~hmac=140b8687815ff91fc4d4b9be7693506be122181998d7c010a8d58eaca216ff36" alt="404 Not Found"></img>
            </div>

        </div>
    )
}