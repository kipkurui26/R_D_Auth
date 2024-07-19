import { useEffect, useState } from "react";
import NavBar from "../components/navigation/NavBar";

const About = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setIsAuth(true);
      if (user.is_staff) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuth(false);
    }
  }, []);
  return (
    <section className="about">
      <NavBar isAuth={isAuth} isAdmin={isAdmin} />
      <div className="content">
        {isAuth && isAdmin ? (
          <p>You are signed in as an admin user</p>
        ):(
          <p>You are signed in as a regular user</p>
        )}
      </div>
    </section>
  );
};

export default About;
