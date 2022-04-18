import React from "react";
import "./register.css";

const Register = () => {
  return (
    <form style={{ border: "1px solid #ccc" }}>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlfor="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <label htmlfor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <label htmlfor="role">
          <b>Role</b>
        </label>
        <input type="text" placeholder="Role" name="role" required />

        <label>
          <input
            type="checkbox"
            checked="checked"
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

        <div class="clearfix">
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <button type="submit" className="signupbtn">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
