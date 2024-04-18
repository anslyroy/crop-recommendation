import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import '../home.css'
import crop from '../assets/crop3.jpg'
import field from '../assets/field.jpg'


const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password == confirmPassword) {
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                alert("Account created successfully")
            } catch (e) {
                alert("Some error occured")
            }
        } else {
            alert("Password doesnot match")
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="parent">


                <div class="child">
                    <div class="left">
                        <h1>Smart Farming with Machine Learning</h1>
                        <div class="inside">
                            <form className='formbox' onSubmit={onSubmit}>
                                <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <input type="text" placeholder="username" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} />
                                <button type="submit" >Sign Up</button>
                            </form>
                        </div>
                        <Link to={'/login'}>   Already a customer?</Link>

                    </div>

                    <img src={field} alt="" srcset="" />

                </div>
            </div>
        </>
    )
}

export default Register