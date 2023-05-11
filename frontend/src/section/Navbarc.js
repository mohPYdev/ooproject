import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from '../pages/Login'
import SignUp from '../pages/SignUp';
import Reservation from '../pages/Reservation';
import { useAuthContext } from '../hooks/useAuthContext'
import Home from '../pages/Home';
import Profile from  '../pages/Profile'
import { useLogout} from '../hooks/useLogout'

export default function Navbarc() {

  const navigate = useNavigate()

  const {user} = useAuthContext()
  const {logout } = useLogout()

  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
            {!user ?<Navbar.Brand href={'/'}>بیمارستان</Navbar.Brand> : <></>}
              <Nav className="me-auto">
                {user ? <Nav.Link href={'/home'}>خانه</Nav.Link> : <></>}
                {!user ? <Nav.Link href={'/signup'}>ثبت نام</Nav.Link> : <></>}
                {!user ? <Nav.Link href={'/login'}>ورود</Nav.Link> : <></>}

                {user ? <Nav.Link href={'/profile'}>پروفایل</Nav.Link> : <></>}
                {user ? <Nav.Link  onClick={handleClick}>خروج</Nav.Link> : <></>}
              </Nav>
            </Container>
          </Navbar>
          </>

  )
}
