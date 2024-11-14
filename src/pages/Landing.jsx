import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApis'



function Landing() {

    const [logStatus, setlogStatus] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setlogStatus(true)
        }
        else {
            setlogStatus(false)
        }
        getData()
    }, [])

    const getData = async () => {
        const res = await allProjectsApi()
        if (res.status == 200) {
            setData(res.data)
        }
    }
    console.log(data)

    return (
        <>
            <div className='container-fluid bg-info d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
                <Row className='p-4'>
                    <Col className='d-flex justify-content-center flex-column'>

                        <h2 className='text-light'>Project Fair</h2>
                        <p style={{ textAlign: 'justify' }} className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Deserunt error amet aut illo doloribus at, veritatis facilis
                            velit id pariatur recusandae odio dolorem. Sunt possimus reprehenderit corrupti error quibusdam debitis.</p>
                        <div className="d-grid">
                            {
                                logStatus ?
                                    <Link className="btn btn-warning" to={'/dash'}>Go to Dashboard</Link>
                                    :
                                    <Link className='btn btn-success' to={'/auth'}>Start to Explore..</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-web-developer-doing-research-on-development-illustration-download-in-svg-png-gif-file-formats--thinking-researching-and-pack-design-illustrations-4759504.png"
                            alt="landing" className='img-fluid rounded' />

                    </Col>
                </Row>
            </div>

            <div className="container-fluid p-5">

                <h3 className='text-center mb-5'>Sample Projects</h3>

                {
                    data.length > 0 ?
                        <div className='d-flex justify-content-around'>
                            {data.slice(0, 3).map(item => (
                                <ProjectCard project={item}/>
                            ))}
                        </div>
                        :
                        <h3 className='my-3 text-center text-danger'>No Projects Available!!</h3>
                }

                <div className='mt-4 text-center'>
                    <Link to={'/projects'}>View More</Link>
                </div>

            </div>
        </>
    )
}

export default Landing