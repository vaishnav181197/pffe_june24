import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateprojectApi } from '../services/allApis';

function Edit({project}) {
    const [show, setShow] = useState(false);
    const [data,setData]=useState({})
    const [preview,setPreview]=useState("")

    useEffect(()=>{
        setData({...project})
    },[])

    useEffect(()=>{
        if(data.image?.type){
            setPreview(URL.createObjectURL(data.image))
        }
        else{
            setPreview("")
        }
    },[data.image])

    const handleEdit=async()=>{
        console.log(data)
        const {title,description,languages,github,demo,image}=data
        if(!title||!description||!languages||!github||!demo||!image){
            toast.warning("Enter Valid Inputs!!")
        }
        else{
            if(data.image?.type){
                const fd=new FormData()
                fd.append('title',title)
                fd.append('description',description)
                fd.append('languages',languages)
                fd.append('github',github)
                fd.append('demo',demo)
                fd.append('image',image)

                const header={
                    'Content-Type':'multipart/form-data',
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                }
                const res=await updateprojectApi(data._id,header,fd)
                if(res.status==200){
                    toast.success("Project Details Updated!!")
                    handleClose()
                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(res)
                }
            }
            else{
                const header={
                    'Content-Type':'application/json',
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                }
                const res=await updateprojectApi(data._id,header,data)
                if(res.status==200){
                    toast.success("Project Details Updated!!")
                    handleClose()
                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(res)
                }
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-xl" style={{ color: "#63E6BE", }} />
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-info'>
                    <Row>
                        <Col>
                            <label >
                                <input type="file" onChange={(e)=>setData({...data,image:e.target.files[0]})} style={{ display: 'none' }} />
                                <img src={preview?preview:`${base_url}/uploads/${data.image}`}
                                    alt="" className='img-fluid' />
                            </label>
                        </Col>
                        <Col>
                            <div>
                                <input type="text" onChange={(e)=>setData({...data,title:e.target.value})} defaultValue={data.title} placeholder='Enter Project Title' className="form-control mb-3" />
                                <input type="text" onChange={(e)=>setData({...data,description:e.target.value})} defaultValue={data.description} placeholder='Enter Description' className="form-control mb-3" />
                                <input type="text" onChange={(e)=>setData({...data,languages:e.target.value})} defaultValue={data.languages} placeholder='Enter Languages used' className="form-control mb-3" />
                                <input type="text" onChange={(e)=>setData({...data,github:e.target.value})} defaultValue={data.github} placeholder='Enter GitHub URL' className="form-control mb-3" />
                                <input type="text" onChange={(e)=>setData({...data,demo:e.target.value})} defaultValue={data.demo} placeholder='Enter Demo URL' className="form-control mb-3" />
                            </div>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit