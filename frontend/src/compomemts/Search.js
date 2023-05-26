import React, {  useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const location = useLocation();
    const nav = useNavigate()
    const [se , setse] = useState("")
    let show = true
    if (location.pathname === "/profile")
      show = false

    const search = (e) => {
        e.preventDefault()
        location.pathname==='/home' ?
            nav(`/home?q=${se}`)
            :
            nav(`${location.pathname}?q=${se}`)
    }
  return (
        <>
          {show && <Form className="d-flex" onSubmit={search}>
            <Button variant="outline-success" style={{ marginRight:'10px', cursor:'pointer' }} onClick={search}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            </Button>
                <Form.Control
                    type="search"
                    placeholder= {location.pathname==='/home' ? "جست و جوی سرویس" : "جست و جوی دکتر"}
                    className="me-2"
                    aria-label="Search"
                    style={{ direction:'rtl', width:'48vh' }}
                    onChange={(e) => setse(e.target.value)}
                    value={se}
                />
            </Form>}
        </>
  )
}
