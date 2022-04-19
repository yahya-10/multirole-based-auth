import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../features/slices/auth";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (
    e,
    formValue = { firstName, lastName, email, password, role }
  ) => {
    e.preventDefault();
    // const { email, password, role } = formValue;
    dispatch(register(formValue))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => setSuccessful(false));
  };

  useEffect(() => {
    if (successful) return navigate("/");
    console.log("register.js", isLoggedIn);
  });

  console.log("register.js", firstName, lastName, email, password, role);

  return (
    <form style={{ border: "1px solid #ccc" }}>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="firstName">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="Joe"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          placeholder="Doe"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="joe@email.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="********"
          name="psw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="role">
          <b>Role</b>
        </label>
        <input
          type="text"
          placeholder="Ex: client"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            name="remember"
            style={{ marginBottom: "15px" }}
          />{" "}
          Remember me
        </label>

        <p>
          By creating an account you agree to our{" "}
          <a href="/" style={{ color: "dodgerblue" }}>
            Terms & Privacy
          </a>
          .
        </p>

        <div className="clearfix">
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <button className="signupbtn" onClick={handleRegister}>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
