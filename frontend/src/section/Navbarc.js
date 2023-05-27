import React from 'react'
import {  useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout} from '../hooks/useLogout'

export default function Navbarc() {

  const navigate = useNavigate()

  const {user} = useAuthContext()

  const { logout, error, isPending } = useLogout()

  const handleClick = () => {
    logout()
    navigate('/')
  }


  return (
        <>
          <Navbar data-testid='navbar' bg="dark" variant="dark" >
            <Container>
            {!user ?<Navbar.Brand href={'/'}>بیمارستان</Navbar.Brand> : <></>}
              <Nav className="me-auto">
                {user ? <Nav.Link href={'/home'}>خانه</Nav.Link> : <></>}
                {!user ? <Nav.Link data-testid='signup-link' href={'/signup'}>ثبت نام</Nav.Link> : <></>}
                {!user ? <Nav.Link href={'/login'}>ورود</Nav.Link> : <></>}
                {user ? <Nav.Link href={'/profile'}>پروفایل</Nav.Link> : <></>}
                {user ? <Nav.Link data-testid='exit' onClick={handleClick}>خروج</Nav.Link> : <></>}
              </Nav>
            </Container>
          </Navbar>
          </>

  )
}
