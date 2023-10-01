import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.scss'

const Login = () => {

    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const navigate = useNavigate()

    const { loading, error, dispatch} = useContext(AuthContext)

    const handleChange = (e) =>{
        setCredentials(prev =>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:'LOGIN_START'})
        try {
            const res = await axios.post('https://reservationapi.onrender.com/auth/login', credentials)
            if(res.data.isAdmin){
                dispatch({type:'LOGIN_SUCCESS', payload: res.data.details})
                navigate('/')
            }
            else{
                dispatch({type:'LOGIN_FAIL', payload: {message:'You are not allowed'}})
                navigate('/')
            }
     
        } catch (error) {
            dispatch({type:'LOGIN_FAIL', payload: error.response.data})
        }
    }

    // console.log(user)

  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id="username" onChange={handleChange} className="linput" />
            <input type="password" placeholder='password' id="password" onChange={handleChange} className="linput" />
            <button disabled={loading} onClick={handleClick} className="lbtn">
                Login
            </button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login