import React from 'react'
import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import { responseContext } from '../contextapi/ContextProvider';

function Add() {
    const [show, setShow] = useState(false);
    const [project, setproject] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })
    const [preview, setPreview] = useState("")

    const {setResponse}=useContext(responseContext)

    const handleProjectAdd = async () => {
        console.log(project)
        const { title, description, languages, github, demo, image } = project
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('description', description)
            fd.append('languages', languages)
            fd.append('github', github)
            fd.append('demo', demo)
            fd.append('image', image)


            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }

            const res = await addProjectApi(fd, header)
            console.log(res)
            if (res.status == 200) {
                toast.success("Project Added!!")
                handleClose()
                setResponse(res)
            }
        }
    }

    useEffect(() => {

        if (project.image) {
            setPreview(URL.createObjectURL(project.image))
        }
        else {
            setPreview("")
        }

    }, [project.image])



    const handleClose = () => {
        setShow(false);
        setproject({
            title: "", description: "", languages: "", github: "", demo: "", image: ""
        })
    }

    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-warning' onClick={handleShow}>Add Project +</button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-info'>
                    <Row>
                        <Col>
                            <label >
                                <input type="file" onChange={(e) => setproject({ ...project, image: e.target.files[0] })} style={{ display: 'none' }} />
                                <img src={preview ? preview : "https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-image-upload-icon-photo-upload-icon-png-image_2047546.jpg"}
                                    alt="" className='img-fluid' />
                            </label>
                        </Col>
                        <Col>
                            <div>
                                <input type="text" onChange={(e) => setproject({ ...project, title: e.target.value })} placeholder='Enter Project Title' className="form-control mb-3" />
                                <input type="text" onChange={(e) => setproject({ ...project, description: e.target.value })} placeholder='Enter Description' className="form-control mb-3" />
                                <input type="text" onChange={(e) => setproject({ ...project, languages: e.target.value })} placeholder='Enter Languages used' className="form-control mb-3" />
                                <input type="text" onChange={(e) => setproject({ ...project, github: e.target.value })} placeholder='Enter GitHub URL' className="form-control mb-3" />
                                <input type="text" onChange={(e) => setproject({ ...project, demo: e.target.value })} placeholder='Enter Demo URL' className="form-control mb-3" />
                            </div>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProjectAdd}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add