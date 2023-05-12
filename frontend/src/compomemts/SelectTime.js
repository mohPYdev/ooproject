import React, { useEffect } from 'react'
import './SelectTime.css'
import './ServiceCard.css'

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { LocalUrl } from '../utils/constant'
import { useFetch } from '../hooks/useFetch'

export default function SelectTime({id, service_id, setTime, setTimePicked, setIsFull}) {

  const {data:freetimes} = useFetch(LocalUrl + `shifts/${id}/free_time/${service_id}/`)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (freetimes){
      if (freetimes.length === 0){
        setIsFull(true)
      }
    }
  }, [freetimes])


  if (freetimes?.length === 1){
    setTime(freetimes[0].start)
    setTimePicked(true)
    return null
  }

  return (
    <>
    <div>
      <Button className='chooseTime serviceCardTransitions' variant="primary" onClick={handleShow}>
        انتخاب زمان
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >زمان های در دسترس</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='row'>
                {freetimes && freetimes.map((ft) => (
                  <div key={ft.start} className="col-2 mx-2 ">
                      <button
                        className='btn btn-light btn-sm mt-2 mx-2 serviceCardTransitions'
                        value={ft.start.slice(0,16)}
                        onClick={(e) => {
                          setTime(e.target.value);
                          setShow(false);
                          setTimePicked(true)
                        }}>
                          {new Intl.DateTimeFormat('en', {
                              hour:"2-digit",
                              minute:"2-digit"

                          }).format(
                            new Date(ft.start.slice(0,16))
                          )}
                      </button>
                  </div>
                ))}

              </div>

        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}
