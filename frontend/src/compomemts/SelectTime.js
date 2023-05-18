import React, { useEffect } from 'react'
import './SelectTime.css'
import './ServiceCard.css'

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { LocalUrl } from '../utils/constant'
import { useFetch } from '../hooks/useFetch'
import moment from 'moment';

export default function SelectTime({id, service_id, setTimet, setTimePicked, setIsFull,showbtn}) {

  const {data:freetimes} = useFetch(LocalUrl + `shifts/${id}/free_time/${service_id}/`)
  console.log(freetimes)
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
    // let d = new Date(freetimes[0].start.slice(0,16))
    // d.setTime (new Date(freetimes[0].start.slice(0,16)).getTime () + (8*60*60*1000))
    // setTimet(d.toISOString().slice(0,16))
    setTimet(freetimes[0].start)
    setTimePicked(true)
    return null
  }

  return (
    <>
    <div>
      <Button className='chooseTime serviceCardTransitions' variant="primary" disabled={!showbtn} onClick={handleShow}>
        انتخاب زمان
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >زمان های در دسترس</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='row'>
                {freetimes && freetimes.map((ft) => {
                    let d = new Date(ft.start.slice(0,16))
                    d.setTime (new Date(ft.start.slice(0,16)).getTime () + (7*60*60*1000))
                    // console.log(d.toISOString().slice(0,16))
                    return (
                      <div key={ft.start} className="col-2 mx-2 ">
                          <button
                            className='btn btn-light btn-sm mt-2 mx-2 serviceCardTransitions'
                            value={d.toISOString().slice(0,16)}
                            onClick={(e) => {
                              setTimet(e.target.value);
                              setShow(false);
                              setTimePicked(true)
                            }}>
                              {new Intl.DateTimeFormat('en', {
                                  hour:"2-digit",
                                  minute:"2-digit"
    
                              })
                              .format(
                                new Date(d.toISOString().slice(0,16))
                              )
                              }
                          </button>
                      </div>
                    )
                }
                )
                }

              </div>

        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}
