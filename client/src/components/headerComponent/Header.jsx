import { Link } from "react-router-dom";
import "./header.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.log(error);
      alert("Logout Unsuccessful");
    }
  };

  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && username.length > 0 ? (
          <>
            <Link to={"/create"}>Create New Post </Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
