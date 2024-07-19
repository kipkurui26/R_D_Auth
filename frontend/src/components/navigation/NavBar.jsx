import "./navigation.css";
import { Link } from "react-router-dom";
import { navList, adminList } from "./NavList";
import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const NavBar = ({ isAuth = false, isAdmin = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userInitials =user && user.first_name.charAt(0) + user.last_name.charAt(0);
  const [menu, showMenu] = useState(false);

  return (
    <section className="navigation">
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            AUTH
          </Link>
          {isAuth && (
            <ul className="nav-links">
              {navList.map(({ id, name, url, cName }) => (
                <li key={id}>
                  <Link to={url} className={cName}>
                    {name}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <>
                  {adminList.map(({ id, name, url, cName }) => (
                    <li key={id}>
                      <Link to={url} className={cName}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
          <div className="auth-user">
            {isAuth ? (
              <div className="auth__profile" onClick={()=> showMenu(!menu)}>
                <div className="user-profile">{userInitials}</div>
                <span>{user.username}</span>
              </div>
            ) : (
              <Link to="/login" className="signin">
                Sign In
              </Link>
            )}
            {menu && (
              <div className="menu">
                <ul className="menu__list">
                  <li className="menu__list--items">
                    <Link to="/manage-account" className="menu__list--link">
                      <FaUser className="menu__list--icon" />
                      Profile
                    </Link>
                  </li>
                  <li className="menu__list--items">
                    <Link to="/logout" className="menu__list--link">
                      <FaSignOutAlt className="menu__list--icon" />
                      logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
