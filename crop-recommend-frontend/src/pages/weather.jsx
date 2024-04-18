import React, { useEffect, useState } from 'react'
import '../home.css';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context';
import field from '../assets/field.jpg'
import loading from '../assets/cloud.gif'

const Weather = (props) => {

    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [latLon, setLatLon] = useState({});
    const periods = {
        todaymorning: false,
        todayafternoon: false,
        todayevening: false,
        todaynight: false,
        tomorrowmorning: false,
        tomorrowafternoon: false,
        tomorrowevening: false,
        tomorrownight: false
    };
    const API_KEY = 'rS73D7werLRgukR4QgiDgEVlObtXryfJ';

    useEffect(() => {

        console.log('start')
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatLon({ latitude, longitude });

                    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${API_KEY}`;

                    fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            setWeather(data);
                            console.log("data")
                            console.log(data)
                            console.log("data")
                            getrainprobability(data);
                        })
                        .catch((error) => console.error('Error fetching data:', error));


                }
            );
        };

        fetchData();
        console.log('weather')
    }, []);

    const getrainprobability = (w) => {
        console.log("weather")
        console.log(w)

        if (!w) return null;

        const today = new Date();
        const todayString = today.toISOString().slice(0, 10);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().slice(0, 10);

        const filteredData = w?.timelines?.minutely?.filter(item => {
            const itemDate = item.time.slice(0, 10);
            return itemDate === todayString || itemDate === tomorrowString;
        });

        filteredData.forEach(item => {
            const rainIntensity = item.values.rainIntensity;
            if (rainIntensity > 0) {
                const time = new Date(item.time);
                const hour = time.getHours();
                let period;
                if (hour >= 5 && hour < 12) {
                    period = 'morning';
                } else if (hour >= 12 && hour < 17) {
                    period = 'afternoon';
                } else if (hour >= 17 && hour < 20) {
                    period = 'evening';
                } else {
                    period = 'night';
                }

                const isToday = item.time.startsWith(todayString);
                const isTomorrow = item.time.startsWith(tomorrowString);

                if (isToday) {
                    periods[`today${period}`] = true;
                } else if (isTomorrow) {
                    periods[`tomorrow${period}`] = true;
                }
            }
        });

        console.log(periods)

    }

    return (
        <div className="parent">
            {!userLoggedIn && <Navigate to="/login" replace />}
            <div className="child">
                <div className="left">
                    <h1>Rain Prediction</h1>
                    <br />

                    <h3>Use fertilizers if there is less rain the coming day</h3>
                    <br />
                    {weather ? (
                        <table className='formbox'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Morning</th>
                                    <th>Afternoon</th>
                                    <th>Evening</th>
                                    <th>Night</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Today</td>
                                    <td>{periods.todaymorning ? 'True' : 'False'}</td>
                                    <td>{periods.todayafternoon ? 'True' : 'False'}</td>
                                    <td>{periods.todayevening ? 'True' : 'False'}</td>
                                    <td>{periods.todaynight ? 'True' : 'False'}</td>
                                </tr>
                                <tr>
                                    <td>Tomorrow</td>
                                    <td>{periods.tomorrowmorning ? 'True' : 'False'}</td>
                                    <td>{periods.tomorrowafternoon ? 'True' : 'False'}</td>
                                    <td>{periods.tomorrowevening ? 'True' : 'False'}</td>
                                    <td>{periods.tomorrownight ? 'True' : 'False'}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <img className='loading' src={loading} />
                    )}
                </div>
                <img src={field} alt="" />
            </div>
        </div>
    )
}

export default Weather