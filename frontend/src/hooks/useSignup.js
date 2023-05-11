import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { LocalUrl,RequestTimeOut } from "../utils/constant";

export const useSignup = () => {
  const navigate = useNavigate()
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const SIGNUP_URL = LocalUrl + "auth/users/";

  const signup = async (
    email,
    password,
    username,
    first_name,
    last_name,
    phone_number
  ) => {
    setError(null);
    setIsPending(true);


    try {
      // signup
      const res = await axios.post(SIGNUP_URL, {
        email,
        username,
        password,
        first_name,
        last_name,
        phone_number
      });
      setTimeout(() => {
        setIsPending(false);
      }, RequestTimeOut);


        setError(null);
        navigate('/login')

    } catch (err) {
      console.log(err)
        setError(err.response.data)
        setTimeout(() => {
          setIsPending(false);
        }, RequestTimeOut);


    }
  };

  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, []);

  return { signup, error, isPending };
};
