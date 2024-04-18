import React, { useEffect, useState } from 'react'
import '../home.css';
import cropimg from '../assets/crop3.jpg'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import field from '../assets/field.jpg'

const Yield = () => {
    const { userLoggedIn } = useAuth()
    const navigate = useNavigate();


    const [stateValue, setStateValue] = useState('');
    const [soil, setSoil] = useState('');
    const [area, setArea] = useState('');
    const [crop, setCrop] = useState('');

    const handleStateChange = (e) => {
        setStateValue(e.target.value);
    };

    const handleSoilTypeChange = (e) => {
        setSoil(e.target.value);
    };

    const handleAreaChange = (e) => {
        setArea(e.target.value);
    };

    const handleCropChange = (e) => {
        setCrop(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (stateValue !== '' && soil != '' && area !== '' && crop !== '') {
            console.log("starting")
            const data = {
                selectedValues: [stateValue, crop, area, soil]
            };
            fetch('http://127.0.0.1:5000/yieldpredict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    console.log("data")
                    console.log('Prediction result:', data.data['class']);
                    navigate('/yieldpredict', { state: { res: data.data['class'] } })
                });
        } else {
            alert("Please fill all fields.")
        }


    };
    return (


        <div class="parent">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)
            }
            <div class="child">
                <div class="left">
                    <h1>Smart Farming with Machine Learning</h1>
                    <div class="inside">
                        I will help you find how much yield you can expect.
                    </div>
                    <br />
                    <form className='formbox' onSubmit={handleSubmit}>
                        <select id="state" value={stateValue} onChange={handleStateChange}>
                            <option value="0">Andaman and Nicobar Islands</option>
                            <option value="1">Andhra Pradesh</option>
                            <option value="3">Assam</option>
                            <option value="4">Goa</option>
                            <option value="5">Karnataka</option>
                            <option value="6">Kerala</option>
                            <option value="7">Meghalaya</option>
                            <option value="8">Puducherry</option>
                            <option value="9">Tamil Nadu</option>
                            <option value="10">West Bengal</option>
                            <option value="11">Bihar</option>
                            <option value="12">Chhattisgarh</option>
                            <option value="13">Dadra and Nagar Haveli</option>
                            <option value="14">Gujarat</option>
                            <option value="15">Haryana</option>
                            <option value="16">Madhya Pradesh</option>
                            <option value="17">Maharashtra</option>
                            <option value="18">Manipur</option>
                            <option value="19">Rajasthan</option>
                            <option value="20">Telangana</option>
                            <option value="21">Uttar Pradesh</option>
                            <option value="22">Arunachal Pradesh</option>
                            <option value="23">Himachal Pradesh</option>
                            <option value="24">Jammu and Kashmir</option>
                            <option value="25">Nagaland</option>
                            <option value="26">Odisha</option>
                            <option value="27">Uttarakhand</option>
                            <option value="28">Mizoram</option>
                            <option value="29">Punjab</option>
                            <option value="30">Tripura</option>
                            <option value="31">Chandigarh</option>
                            <option value="32">Jharkhand</option>
                            <option value="33">Sikkim</option>

                        </select>


                        <select required placeholder="Crop" value={crop} onChange={handleCropChange}>
                            <option value="0">Arecanut</option>
                            <option value="1">Banana</option>
                            <option value="2">Dry chillies</option>
                            <option value="3">Coconut</option>
                            <option value="4">Cotton</option>
                            <option value="5">Dry ginger</option>
                            <option value="6">Groundnut</option>
                            <option value="7">Maize</option>
                            <option value="8">Moong(Green Gram)</option>
                            <option value="9">Onion</option>
                            <option value="10">Paddy</option>
                            <option value="11">Ragi</option>
                            <option value="12">Sugarcane</option>
                            <option value="13">Tobacco</option>
                            <option value="14">Turmeric</option>
                            <option value="15">Rice</option>

                        </select>

                        <select id="soilType" value={soil} onChange={handleSoilTypeChange}>
                            <option value="0">Sandy</option>
                            <option value="1">Red</option>
                            <option value="2">Black</option>
                            <option value="3">Clayey</option>
                            <option value="4">Alluvial</option>
                            <option value="5">Loamy</option>
                            <option value="6">Latterite</option>
                        </select>

                        <input type="text" id="area" value={area} placeholder='Area' onChange={handleAreaChange} />
                        <button type='submit'>Predict Yield</button>
                    </form>
                </div>

                <img src={field} alt="" srcset="" />

            </div>
        </div>
    )
}

export default Yield