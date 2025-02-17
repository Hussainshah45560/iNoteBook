import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:5000/auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
      console.log(json);
      if (json.success){
        //redirecting to home page
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.alert("Logged in Successfully", "success")
      }
      else{
        props.alert("Invalid credentials", "danger")
      }

    };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Login to continue iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input  value={credentials.email} onChange={onChange} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"  placeholder="Abcd@Example.com"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={credentials.password} onChange={onChange} name="password" type="password" minLength={8} required className="form-control" placeholder="Please enter your password"/>
        </div>
        <button  type="submit" className="btn btn-primary mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
