import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { LocalUrl } from '../utils/constant'
import './ShowItem.css'

export default function ShowItem({doc_id}) {

    const {data:item} = useFetch(LocalUrl + `items/${doc_id}/`)

  return (
    <div>
        <div className='img-container'><img className="card-img-top" src={item?.image} alt="تصویری برای این سرویس در دسترس نیست" /></div>
        <p className="h5"><span className='showItemText'>{item?.first_name}  {item?.last_name}</span> <span className='showItemTitles'>: پزشک</span></p>
        <p className="card-subtitle text-muted"><span className='showItemText'>{item?.category}</span> <span className='showItemTitles'>: تخصص</span></p>
        <p className='mt-3'><em><span className='showItemText'>{item?.description}</span> <span className='showItemTitles'>: توضیحات</span></em></p>
        <p><span className='showItemText'>{item?.experience}</span> <span className='showItemTitles'>: تجربه</span></p>
        <p><span className='showItemText'>{item?.phone_number}</span> <span className='showItemTitles'>: تلفن</span></p>
    </div>
  )
}
