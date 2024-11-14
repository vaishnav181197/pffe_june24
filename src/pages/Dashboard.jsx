import React, { useState, useEffect,useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { getProjectApi,deleteProjectApi } from '../services/allApis'
import { responseContext } from '../contextapi/ContextProvider'
import { toast } from 'react-toastify'


function Dashboard() {

  const [uname, setUname] = useState("")
  const [projects, setProjects] = useState([])
  const {response}=useContext(responseContext)

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getProjectApi(header)
    console.log(res)
    if (res.status == 200) {
      setProjects(res.data)
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))


    }
    getData()
  }, [response])

  const handleDelete=async(id)=>{
    const header={
      'Content-Type':"application/json",
      "Authorization":`Token ${sessionStorage.getItem('token')}`
    }

    const res=await deleteProjectApi(id,header)
    if(res.status==200){
      getData()
    }
    else{
      toast.warning("Something Went Wrong!!")
      console.log(res)
    }
  }


  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h1 className="text-center my-3">Welcome ,<span className='text-info'>{uname}</span></h1>
        <h2>User Projects</h2>
        <Row>
          <Col sm={12} md={8}>
            <div className='w-100 border shadow border-dark p-3 my-3'>
              <Add />
              <div className='m-2 px-1 py-5 bg-light border'>
                {
                  projects.length > 0 ?
                    projects.map(item => (
                      <div className='border shadow border-2 d-flex justify-content-between p-3'>
                        <h4>{item.title}</h4>
                        <div>
                          <a href={item.github} className='btn text-dark'><i className="fa-brands fa-github fa-xl" /></a>
                          <Edit project={item}/>
                          <button className='btn' onClick={()=>handleDelete(item._id)}>
                            <i className="fa-solid fa-trash fa-xl" style={{ color: "#e60532", }} />
                          </button>
                        </div>
                      </div>
                    ))
                    :
                    <h3 className='text-center text-danger'>No Projects Added Yet!!</h3>
              }
                {/* project-list */}



              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Dashboard