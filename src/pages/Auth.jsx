import React, { useState,useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { regiterApi,loginApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextapi/AuthContext';
function Auth() {

    const [authStatus, setAuthStatus] = useState(false)
    const [user,setUser]=useState({
        email:"",username:"",password:""
    })
    const nav=useNavigate()
    const {setlogStatus}=useContext(logContext)

    const changeAuth = () => {
        setAuthStatus(!authStatus)
    }

    const handleRegister=async()=>{
        console.log(user)
        const {email,username,password}=user
        if(!email || !username || !password){
            toast.warning("Enter Valid Data!!")
        }
        else{
            const res=await regiterApi(user)
            console.log(res)
            if(res.status==200){
                toast.success("Registration Successfull!!")
                changeAuth()
                setUser({
                    email:"",username:"",password:""
                })
            }
            else{
                toast.error("Registration failed!!")
            }
        }
    }
    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.warning("Enter Valid Data!!")
        }
        else{
            const res=await loginApi(user)
            console.log(res)
            if(res.status==200){
                toast.success("Login Successfull!!")
                setUser({
                    username:"",email:"",password:""
                })
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('user',res.data.username)
                sessionStorage.setItem('profile',res.data.profile)
                sessionStorage.setItem('github',res.data.github)
                sessionStorage.setItem('linkdin',res.data.linkdin)
                setAuthStatus(true)
                setlogStatus(true)
                nav('/')
            }
            else{
                toast.error("Login Failed!!")
            }
        }
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="w-75 border shadow p-4 row">
                    <div className="col">
                        <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727136000&semt=ais_hybrid"
                            alt="" className='img-fluid' />
                    </div>
                    <div className="col bg-light">
                        {
                            authStatus ?
                                <h2>User Registration</h2>
                                :
                                <h2>Login</h2>

                        }
                        <div className='my-3'>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            {
                                authStatus &&
                                <FloatingLabel controlId="floatingInputUsr" label="Username" className="mb-3">
                                    <Form.Control type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="name" />
                                </FloatingLabel>
                            }

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password" />
                            </FloatingLabel>
                            <div className='mt-5 d-flex justify-content-between'>
                                {
                                    authStatus ?
                                        <button className="btn btn-secondary" onClick={handleRegister}>Register</button>
                                        :
                                        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
                                }
                                <button className='btn btn-link' onClick={changeAuth}>
                                    {
                                        authStatus ?
                                            <>Already a User?</>
                                            :
                                            <>New User?</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth