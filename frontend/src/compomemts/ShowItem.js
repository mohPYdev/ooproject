import React, { useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { LocalUrl } from '../utils/constant'
import './ShowItem.css'
import { useLocation } from 'react-router-dom'

export default function ShowItem({doc_id , setshow}) {

    const {data:item} = useFetch(LocalUrl + `items/${doc_id}/`)

    //search
    const queryurl = useLocation().search
    const queryparam = new URLSearchParams(queryurl)
    let query = queryparam.get('q')

    if (!query)
        query = ""

    query = query.toUpperCase()
    //
    useEffect(() => {
      if (item)
          if (
            (item.name.toUpperCase().includes(query)) ||
            (item.first_name.toUpperCase().includes(query)) ||
            (item.last_name.toUpperCase().includes(query)) ||
            (item.phone_number.toUpperCase().includes(query))
            ){
              setshow(true)
              console.log("hoyeeeee")
            }
    },[item, query])
    

  return (
    <div>
        <h3 className='showItemText text-center'>{item?.name}  :نام</h3>
        <div className='img-container'><img className="card-img-top" src={item?.image} alt="تصویری برای این سرویس در دسترس نیست" /></div>

        <p className="h5"><span className='showItemText'>{item?.first_name}  {item?.last_name}</span> <span className='showItemTitles'>: پزشک</span></p>
        <p className="card-subtitle text-muted"><span className='showItemText'>{item?.category}</span> <span className='showItemTitles'>: تخصص</span></p>
        <p className='mt-3'><em><span className='showItemText'>{item?.description}</span> <span className='showItemTitles'>: توضیحات</span></em></p>
        <p><span className='showItemText'>{item?.experience}</span> <span className='showItemTitles'>: تجربه</span></p>
        <p><span className='showItemText'>{item?.phone_number}</span> <span className='showItemTitles'>: تلفن</span></p>
    </div>
  )
}
