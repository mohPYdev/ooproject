import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { LocalUrl } from '../utils/constant'

export default function ShowItem({doc_id}) {

    const {data:item} = useFetch(LocalUrl + `items/${doc_id}/`)

    // const [sumDes, setSumDes] = useState()


    // useEffect(() => {
    //   if (item) {
    //     setSumDes(item.description.substring(0,30))
    //   }
    // }, [item])

  return (
    <div>
        <div className='img-container'><img className="card-img-top" src={item?.image} alt="Card image cap" /></div>
        <p className="h5">{item?.first_name}  {item?.last_name}</p>
        <p className="card-subtitle text-muted">{item?.category}</p>
        <p className='mt-3'><em>{item?.description}</em></p>
        <p>{item?.experience}</p>
        <p>{item?.phone_number}</p>
    </div>
  )
}
