import { useEffect, useState } from "react";
import NavBar from "../components/navigation/NavBar";

const Home = () => {
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
    <section className="home">
      <NavBar isAuth={isAuth} isAdmin={isAdmin} />
      <div className="content">
        {isAuth ? (
          isAdmin ? (
            <p>You are signed is as an admin user</p>
          ) : (
            <p>You are signed in as a regular user</p>
          )
        ) : (
          <p>You are not signed in</p>
        )}
      </div>
    </section>
  );
};

export default Home;
