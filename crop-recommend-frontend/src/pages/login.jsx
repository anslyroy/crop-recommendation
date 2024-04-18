import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { useAuth } from '../context/'
import '../home.css'
import crop from '../assets/crop3.jpg'
import field from '../assets/field.jpg'
import plant from '../assets/plant.jpg'


const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await doSignInWithEmailAndPassword(email, password)
            alert("Sign-in successful.");
        } catch (error) {
            console.error("Sign-in error:", error.message);
            alert("Please check your email and password.");
        }
    }

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div class="parent">


                <div class="child">
                    <div class="left">
                        <h1>Smart Farming with Machine Learning</h1>
                        <div class="inside">
                            <form className='formbox' onSubmit={onSubmit}>
                                <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                                <button type='submit'>Login</button>
                            </form>
                        </div>
                        <Link to={'/register'}>  Create account here</Link>

                    </div>

                    <img src={field} alt="" srcset="" />

                </div>
            </div>
        </div>
    )
}

export default Login