import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextapi/AuthContext';

function Header() {

    const nav=useNavigate()
    const {setlogStatus}=useContext(logContext)

    const handleLogout=()=>{
        sessionStorage.clear()
        toast.info("User Logged Out!!")
        setlogStatus(false)
        nav('/auth')
    }

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fa-solid fa-diagram-project fa-lg" style={{ color: "#74C0FC", }} />
                        {' '}
                        ProjectFair
                    </Navbar.Brand>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header