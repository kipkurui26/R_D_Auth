import { useEffect, useState } from "react";
import NavBar from "../components/navigation/NavBar";

const Dashboard = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user){
      setIsAuth(true);
      if (user.is_staff){
        setIsAdmin(true);
      }
    }
  }, []);
  return (
    <section className="dashboard">
      <NavBar isAdmin={isAdmin} isAuth={isAuth}/>
      <h1>Dashboard</h1>
      <p>only admin can access this page</p>
    </section>
  );
};

export default Dashboard;
