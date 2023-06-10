import React, { useEffect, useState } from 'react'
import './SelectTime.css'
import './ServiceCard.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { LocalUrl } from '../utils/constant'
import { useFetch } from '../hooks/useFetch'
import {  message, Popconfirm} from 'antd';

export default function SelectTime({setdor,id, service_id, setTimet, setTimePicked, setIsFull,showbtn}) {

  const [a , seta] = useState("")
  // reserve process 
  const [tmp , settmp] = useState(null)

  const confirm = (e) => {
    setTimet(tmp.target.value);
    setShow(false);
    setTimePicked(true)
    setdor(true)
    message.success('با موفقیت رزرو شد');
  };
  // end of reserve process

  const {data:freetimes} = useFetch(LocalUrl + `shifts/${id}/free_time/${service_id}/`)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (freetimes){
      if (freetimes.length === 0){
        setIsFull(true)
      }
      let b = new Intl.DateTimeFormat('fa-IR').format(new Date(freetimes[0].start.slice(0,16)).getTime () + (3*60*60*1000) + (30*60*1000))
      seta(b.toString())
    }
    // console.log(freetimes)
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
        <Modal.Header closeButton >
          <Modal.Title style={{direction: 'rtl',width:'100%', marginRight:'30px'}}>
            زمان های در دسترس
            <hr></hr>
            <h6>{a}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='row'>
                {freetimes && freetimes.map((ft) => {
                    let d = new Date(ft.start.slice(0,16))
                    let rdate = new Intl.DateTimeFormat('fa-IR', {dateStyle: 'full', timeStyle: 'long'}).format(new Date(ft.start.slice(0,16)).getTime () + (3*60*60*1000) + (30*60*1000)).slice(0,-16)
                    d.setTime (new Date(ft.start.slice(0,16)).getTime () + (7*60*60*1000))
                    // console.log(d.toISOString().slice(0,16))
                    return (
                      <div key={ft.start} className="col-2 mx-2 ">
                        <Popconfirm
                          title="رزرو"
                          description={'رزرو نوبت در تاریخ  ' + rdate + 'انجام شود؟'}
                          placement="bottom"
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                          zIndex={10000}
                        >
                          <button
                            className='btn btn-light btn-sm mt-2 mx-2 serviceCardTransitions'
                            value={d.toISOString().slice(0,16)}
                            onClick={(e) => {
                              settmp(e)
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
                        </Popconfirm>
                          
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
