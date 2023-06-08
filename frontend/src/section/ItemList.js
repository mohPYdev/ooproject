import { LocalUrl } from '../utils/constant';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
function ItemList() {
    const { data, isPending, error } = useFetch(LocalUrl + "services/")
    const [items, setItems] = useState([])
    const ItemCard = items ? React.lazy(() => import('../compomemts/ItemCard')) : null

    useEffect(() => {
        if (data) {
            setItems(data)
            console.log(data)
        }

    }, [data])
    return (
        <div >
            {items && items.map((doc) => (
                <div className='col-md-4 ' key={doc.id}>
                    <ItemCard id={doc.id} />
                </div>
            ))}
        </div>
    )
}
export default ItemList