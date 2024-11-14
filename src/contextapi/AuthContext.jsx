import React,{useState,useEffect} from 'react'
import { createContext } from 'react'


export const logContext=createContext()

function AuthContext({children}) {

    useEffect(()=>{
        checkLogStatus()
    },[])

    const checkLogStatus=()=>{
        if(sessionStorage.getItem('token')){
            setlogStatus(true)
        }
        else{
            setlogStatus(false)
        }
    }


    const [logStatus,setlogStatus]=useState(false)

  return (
    <>
    <logContext.Provider value={{logStatus,setlogStatus}}>
        {children}
    </logContext.Provider>
    </>
  )
}

export default AuthContext