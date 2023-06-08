import React from 'react';
import { LocalUrl } from '../utils/constant';
import { useFetch } from '../hooks/useFetch';
import {Link }from 'react-router-dom';
function Itemcard({id}) {


    const {data:service, isPending, error} = useFetch(LocalUrl + `services/${id}/`)
    // const Link = React.lazy(()=>import('react-router-dom'))
    return (
        <div className="card text-center">
            <div className="card-header">
            {service?.name} : نام
            </div>
            <div className="card-body">
                <h5 className="card-title">{service?.subtitle} : نوع </h5>
                <p className="card-text">قیمت : {service?.price}</p>
                <Link to={`/reservation/${id}`} className="btn btn-primary">انتخاب</Link>
            </div>
            <div className="card-footer text-body-secondary">
            مدت زمان : {service?.duration}
            </div>
        </div>

    );
}
export default Itemcard;
