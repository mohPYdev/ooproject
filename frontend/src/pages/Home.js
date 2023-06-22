import React, { useEffect, useState } from "react";
// import './Home.css'
import { useFetch } from "../hooks/useFetch";
import { LocalUrl } from "../utils/constant";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchServices, useGetServicesQuery } from "../services/WebApi";

const Home = () => {
  const dispatch = useDispatch();
  // const { data, isLoading, isError, error } = useGetServicesQuery();

  const { data, isPending, error } = useFetch(LocalUrl + "services/");
  const [items, setItems] = useState([]);

  // for serach

  const queryurl = useLocation().search;
  const queryparam = new URLSearchParams(queryurl);
  let query = queryparam.get("q");

  if (!query) query = "";

  query = query.toUpperCase();

  const filterprofile = (s) => s.name.toUpperCase().includes(query);

  //end
  // useEffect(() => {
  //   dispatch(fetchServices());
  //   if (isLoading) {
  //     return <div>Loading services...</div>;
  //   }

  //   if (isError) {
  //     return <div>Error: {error}</div>;
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (data) setItems(data.filter(filterprofile));
  }, [data, query]);

  const ItemCard = items
    ? React.lazy(() => import("../compomemts/ItemCard"))
    : null;

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          {items
            ? items.map((doc) => (
                <div
                  className="col-md-4 "
                  style={{
                    width: "18rem",
                    margin: "40px",
                  }}
                  key={doc.id}
                >
                  <ItemCard id={doc.id} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
