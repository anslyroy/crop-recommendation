import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
import { doSignOut } from '../firebase/auth'
import { useAuth } from '../context'
const Header = () => {

    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const onLogout = async (e) => {
        e.preventDefault()
        await doSignOut();
    }
    return (
        <nav>
            <div class="navleft">
                <h2>Crop Reccomendation</h2>
            </div>
            <div class="navright">
                <ul>
                    <li>
                        <h5> <Link to={'/home'}> Crop Reccomendation</Link></h5>
                    </li>
                    <li>
                        <h5> <Link to={'/yield'}> Yield Prediction</Link></h5>
                    </li>
                    <li>
                        <h5>  <Link to={'/weather'}> Weather</Link></h5>
                    </li>
                    <li>
                        {userLoggedIn ? <h5 onClick={onLogout} >Logout</h5> : <h5>Login to continue</h5>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header