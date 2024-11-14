import React, { useState,useEffect,useContext } from 'react'
import base_url from '../services/base_url'
import { updateprofileApi } from '../services/allApis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'

function Profile() {
    const [status, setStatus] = useState(false)
    const [details,setDetails]=useState({
        username:"",github:"",linkdin:"",profile:""
    })
    const [preview,setPreview]=useState("")
    const nav=useNavigate()
    const {setlogStatus}=useContext(logContext)


    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            setDetails({username:sessionStorage.getItem('user'),github:sessionStorage.getItem('github'),
                linkdin:sessionStorage.getItem('linkdin'),profile:sessionStorage.getItem('profile')
            })
        }
    },[])

    useEffect(()=>{
        if(details.profile.type){
            setPreview(URL.createObjectURL(details.profile))
        }
        else{
            setPreview("")
        }
    },[details.profile])

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleUpdate=async()=>{
        console.log(details)
        const {username,github,linkdin,profile}=details
        if(!username||!github||!linkdin||!profile){
            toast.warning("Enter Valid Inputs!!")
        }
        else{
            
            if(profile.type){
                const fd=new FormData()
                fd.append('username',username)
                fd.append('github',github)
                fd.append('linkdin',linkdin)
                fd.append('profile',profile)

                const header={
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }

                const result=await updateprofileApi(header,fd)
                if(result.status==200){
                    toast.success("Profile Updation Successfull!!")
                    nav('/auth')
                    setlogStatus(false)
                    sessionStorage.clear()
                }
                else{
                    toast.error("Updation Failed!!")
                }
            }
            else{
                const header={
                    'Content-Type':'application/json',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }
                const result=await updateprofileApi(header,details)
                if(result.status==200){
                    toast.success("Profile Updation Successfull!!")
                    nav('/auth')
                    setlogStatus(false)
                    sessionStorage.clear()
                }
                else{
                    toast.error("Updation Failed!!")
                }
            }
        }
    }
    return (
        <>
            <div className="container-fluid mt-2 p-3 d-flex justify-content-center align-items-center">
                {
                    status ?
                        <div className='border shadow border-dark'>
                            <h5 className='text-center'>Profile</h5>
                            <div className='p-3'>
                                <label>
                                    <input type="file" onChange={(e)=>setDetails({...details,profile:e.target.files[0]})} style={{ display: 'none' }} />
                                    <img src={preview?preview:details.profile!=='undefined'?`${base_url}/uploads/${details.profile}`:"https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png"}
                                        alt="profile" className='img-fluid' />
                                </label>
                                <input type="text" defaultValue={details.username} onChange={(e)=>setDetails({...details,username:e.target.value})} placeholder='Username' className="form-control mb-3" />
                                <input type="text" defaultValue={details.github} onChange={(e)=>setDetails({...details,github:e.target.value})} placeholder='GitHub Url' className="form-control mb-3" />
                                <input type="text" defaultValue={details.linkdin} onChange={(e)=>setDetails({...details,linkdin:e.target.value})} placeholder='LinkdIn Url' className="form-control mb-3" />
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-success' onClick={handleUpdate}>Update</button>
                                    <button className='btn btn-danger' onClick={changeStatus}>Cancel</button>
                                </div>
                            </div>

                        </div>
                        :
                        <h5 onClick={changeStatus} style={{ textDecoration: 'underline', color: 'blue',cursor:'pointer' }}>Edit User Profile</h5>


                }

            </div>
        </>
    )
}

export default Profile