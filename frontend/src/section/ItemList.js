import { useFetch } from '../hooks/useFetch';
import { LocalUrl } from '../utils/constant';
import { useState , useEffect } from 'react';
import ItemCard from '../compomemts/ItemCard';
function ItemList() {
    const { data, isPending, error } = useFetch(LocalUrl + "services/")
    const [items, setItems] = useState([])

    useEffect(() => {
        if (data){
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