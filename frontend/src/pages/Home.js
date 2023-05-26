
import React, { useEffect, useState } from 'react';
// import './Home.css'
import { useFetch } from '../hooks/useFetch';

import ItemCard from '../compomemts/ItemCard';
import { LocalUrl } from '../utils/constant';

import { useLocation } from 'react-router-dom'


const Home = () => {

    
    const {data, isPending, error} = useFetch(LocalUrl + "services/")
    const [items, setItems] = useState([])

    // for serach
    const queryurl = useLocation().search
    const queryparam = new URLSearchParams(queryurl)
    let query = queryparam.get('q')

    if (!query)
        query = ""

    query = query.toUpperCase()

    const filterprofile = s => (s.name.toUpperCase().includes(query))

    //end

    useEffect(() => {
        if (data)
            setItems(data.filter(filterprofile))
    },[data, query])

    return (
        <div className='home'>
            <div className='container'>
                <div className='row'>
                    {items ? items.map((doc) => (
                        <div className='col-md-4 ' style={{
                            width: '18rem' ,
                            margin: '40px'
                        }} key={doc.id}>
                            <ItemCard id={doc.id} />
                        </div>
                    )):null}
                </div>
            </div>
        </div>
    );
}

export default Home;
