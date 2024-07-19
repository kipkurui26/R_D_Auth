import { useEffect, useState } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./Constants";
import AxiosInstance from "./AxiosInstance";
import {jwtDecode } from 'jwt-decode'
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, adminRoute=false}) => {
  const [isAuthorized, setisAuthorized] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const authorization = async () => {
      try {
        await auth();
      } catch (error) {
        setisAuthorized(false);
      }
    };
    authorization();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await AxiosInstance.get("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200){
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        await auth();
      }
      else{
        setisAuthorized(false)
      }
    } catch (error) {
      console.log(error);
      setisAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(!token){
        setisAuthorized(false)
        return;
    }
    const decoded = jwtDecode(token);
    const tokenExp = decoded.exp;
    const currentTime = Date.now() / 1000;
    if (tokenExp < currentTime){
        await refreshToken()
    }
    else{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user && user.is_staff){
            setIsAdmin(true)
        }
        setisAuthorized(true)
    }
  };
  if (isAuthorized === null){
    return <div>Loading...</div>
  }
  if (!isAuthorized){
    return <Navigate to="/login" />
  }
  if (adminRoute && !isAdmin){
    return <Navigate to="/" />
  }
  return children;
};

export default ProtectedRoutes;
