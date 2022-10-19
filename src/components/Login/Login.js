import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        form.reset()
        navigate(from, {replace: true})
        setError("");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
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
        <button className="btn-submit">Log In</button>
      </form>
      <p>
        <small>
          New to Ema Jhon? <Link to="/signup">Create a Account</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
