import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './ServiceCard.css'

import SelectTime from './SelectTime';
import { LocalUrl } from '../utils/constant'
import { useFetch } from '../hooks/useFetch'
import ShowItem from './ShowItem';


export default function ServiceCard({shift, serv_id}) {

  const navigate = useNavigate()

  const {data: res, postData} = useFetch(LocalUrl + "reservations/", "POST")

  const [start_t,
    setStart_t] = useState("date");
  const [end_t,
    setEnd_t] = useState("date");
  const [date,
    setDate] = useState("date");
  const [time,
    setTime] = useState(null);

    const [dor , setdor] = useState(false)

    useEffect(() => {
      if(dor){
        handleReserve()
      }
    },[dor])




  const [timePicked,
    setTimePicked] = useState(false)
  const [available,
    setAvailable] = useState(true)
  const [is_full,
    setIsFull] = useState(false)


  const handleReserve = () => {
    postData({
      "item": shift.item,
      "time_date": time,
      "service": serv_id,
      "shift": shift.id,

    })
  }

  useEffect(() => {
    if (shift){
      const d = new Date(`${shift.start_date.slice(0, 16)}`)
      const faDate = new Intl.DateTimeFormat("en", {
        month:"long",
        weekday:"long",
        day:"numeric",
      }).format(d);
      setDate(faDate)

      const sd = new Date(`${shift.start_date.slice(0, 16)}`)
      const faStart = new Intl.DateTimeFormat("en", {
        hour:"numeric",
        hour12:false,
        minute:"numeric",
      }).format(sd);
      setStart_t(faStart)

      const ed = new Date(`${shift.end_date.slice(0, 16)}`)
      const faEnd = new Intl.DateTimeFormat("en", {
        hour:"numeric",
        hour12:false,
        minute:"numeric",
      }).format(ed);
      setEnd_t(faEnd)

      if (!shift.is_available) {
        setAvailable(false)
      }
    }
  },[shift])

  


  useEffect(() => {
    if(res){
      navigate('/profile')
    }
  },[navigate, res])

  // for search
  const [show , setshow] = useState(false)

  return (
    <div className='col-md-4' hidden={!show}>
      <div className="card text-end">
        <div className="card-body">

          <ShowItem doc_id={shift?.item} setshow={setshow}/>
          {available && !is_full && <span style={{width:'100%'}} className='btn btn-success btn-sm disabled btn-success-color'>در دسترس</span>}
          {!available && !is_full && <span style={{width:'100%'}} className='btn btn-danger btn-sm disabled btn-danger-color'>غیر قابل دسترس</span>}
          {is_full && <span style={{width:'100%'}} className='btn btn-danger btn-sm disabled '>پر شده</span> }
          <hr></hr>
          <SelectTime setdor={setdor} id={shift.id} setIsFull={setIsFull} service_id={serv_id} setTimet={setTime} setTimePicked={setTimePicked} showbtn={available && !is_full}/>
          <br/>
          {/* {timePicked && <label className='float-right btn btn-outline-dark btn-sm mx-2 serviceCardTransitions'>{time}</label>} */}
        </div>
        {/* {timePicked && <button className='btn btn-success serviceCardTransitions' onClick={handleReserve}>ذخیره</button>} */}
      </div>
    </div>
  )
}
