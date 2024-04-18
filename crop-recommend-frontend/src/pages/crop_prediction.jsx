import React, { useEffect, useState } from 'react'
import '../home.css';
import field from '../assets/field.jpg'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context';
const Prediction = (props) => {

    const location = useLocation();
    const data = location.state;
    const [res, setRes] = useState(data.res);
    const { userLoggedIn } = useAuth()


    return (
        <div class="parent">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)
            }
            <div class="child">
                <div class="left">
                    <h1>Smart Farming with Machine Learning</h1>
                    <div class="inside formbox">
                        <h1>{res}</h1> might be the most suitable crop for you.
                    </div>

                </div>

                <img src={field} alt="" srcset="" />

            </div>
        </div>
    )
}

export default Prediction