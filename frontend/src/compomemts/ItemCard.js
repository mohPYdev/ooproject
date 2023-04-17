import { useFetch } from '../hooks/useFetch';
import { LocalUrl } from '../utils/constant';
import { Link } from 'react-router-dom'
function Itemcard({id}) {
    const {data:service, isPending, error} = useFetch(LocalUrl + `services/${id}/`)
    return (
        <div class="card text-center">
            <div class="card-header">
            {service?.name}
            </div>
            <div class="card-body">
                <h5 class="card-title">{service?.subtitle}</h5>
                <p class="card-text">قیمت : {service?.price}</p>
                <Link to={`/reservation/${id}`} className="btn btn-primary">انتخاب</Link>
            </div>
            <div class="card-footer text-body-secondary">
            مدت زمان : {service?.duration}
            </div>
        </div>

    );
}
export default Itemcard;
