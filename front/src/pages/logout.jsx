import { useEffect } from "react";
import { useNavigate } from "react-router";


function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('token')
    sessionStorage.setItem('reloaded', 'false');
    navigate('/')
  },[])
  
  return (
    <>
    </>
  );
}

export default Logout;
