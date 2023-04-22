
import React, { useEffect, useState } from 'react';
// import './Home.css'
import { useFetch } from '../hooks/useFetch';

import ItemCard from '../compomemts/ItemCard';
import { LocalUrl } from '../utils/constant';


const Home = () => {

    const {data, isPending, error} = useFetch(LocalUrl + "services/")
    const [items, setItems] = useState([])

    useEffect(() => {
        if (data)
            setItems(data)
    },[data])

    return (
        <div className='home'>
            <div className='container'>
                <div className='row'>
                    {items && items.map((doc) => (
                        <div className='col-md-4 ' style={{
                            width: '18rem' ,
                            margin: '40px'
                        }} key={doc.id}>
                            <ItemCard id={doc.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
