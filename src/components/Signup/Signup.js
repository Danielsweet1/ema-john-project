import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Signup.css";

const Signup = () => {
  const { createUser,verify } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset()
        verify()
        .then(() => {
          alert('Check your Email ')
        })
        
      })
      .catch((e) => {
       console.error(e)
       setError(e.message)
      });

    if (password.length < 6) {
      setError("password must be 6 Charecter");
      return;
    }

    if (password !== confirm) {
      setError("password did not macthed");
      return;
    }
    setError("");

    console.log(confirm, email, password);
  };
  return (
    <div className="form-container">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <p className="error">
          <small>{error}</small>
        </p>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="password"
            required
          />
        </div>
        <button className="btn-submit">Sign Up</button>
      </form>
      <p>
        <small>
          Already Have An Account <Link to="/login">Log In</Link>
        </small>
      </p>
    </div>
  );
};

export default Signup;
