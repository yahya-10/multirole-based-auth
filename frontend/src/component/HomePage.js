import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <h1>Welcome to homepage</h1>
      ) : (
        <div>
          <Link to="/login">Login</Link> Or <Link to="/register">Register</Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
