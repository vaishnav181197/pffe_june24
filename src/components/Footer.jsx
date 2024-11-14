import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className="container-fluid bg-primary">
                <Row className='p-4'>
                    <Col>
                        <h4>Project Fair 2024</h4>
                        <p style={{textAlign:'justify'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor iusto facilis deserunt laborum suscipit quibusdam corporis hic, nemo non quisquam quod accusamus repudiandae cupiditate voluptatibus necessitatibus, illum itaque? Nisi, odio?</p>
                    </Col>
                    <Col>
                        <h4>Links</h4>
                        <div className='d-flex flex-column'>
                            <Link to={'/'} className='text-dark'>Landing</Link>
                            <Link to={'/auth'} className='text-dark'>Login</Link>
                            <Link to={'/projects'} className='text-dark'>All projects</Link>
                        </div>
                    </Col>
                    <Col>
                        <h4>Feedbacks</h4>
                        <textarea name="" id="" className="form-control mt-3"></textarea>
                        <button className='btn btn-dark mt-3'>Submit</button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Footer