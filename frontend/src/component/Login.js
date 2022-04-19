import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/slices/auth";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e, formValue = { email, password }) => {
    e.preventDefault();
    // const { email, password } = formValue;
    setLoading(true);
    dispatch(login(formValue))
      .unwrap()
      .then(() => {
        // props.history.push("/profile");
        // window.location.reload();
        console.log(formValue);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        // console.error(error.message);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      // return <Redirect to="/profile" />;
      // alert("you're logged in");
      console.log(isLoggedIn);
    }
  });

  return (
    <form>
      <div className="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label htmlFor="email">
          <b>email</b>
        </label>
        <input
          type="text"
          placeholder="Enter email"
          name="uname"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
        <label>
          <input type="checkbox" name="remember" /> Remember me
        </label>
      </div>

      <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
        <button type="button" className="cancelbtn">
          Cancel
        </button>
        <span className="psw">
          Forgot <a href="/">password?</a>
        </span>
      </div>
    </form>
  );
};

export default Login;
