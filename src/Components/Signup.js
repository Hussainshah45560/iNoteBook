import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name, email, password} = credentials
    const response = await fetch('http://localhost:5000/auth/Createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
      console.log(json);
      if(json.success){
        //redirecting to home page
        localStorage.setItem('token', json.authtoken);
        navigate("/Login");
        props.alert("Account created Successfully", "success")

      }
      else{
        props.alert("Invalid Details", "danger")
      }
    };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Signup Now to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-1"> 
      <label htmlFor="name">Full Name</label>
      <input className="form-control" type="text" name="name" id="name" value={credentials.name} onChange={onChange} placeholder="Enter your full name"/>
       </div>
        <div className="form-group my-1"> 
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Abcd@Example.com"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-1">
          <label htmlFor="exampleInputPassword1">Enter a new password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            minLength={8} required 
            placeholder="********"
          />
        </div>
        <button  type="submit" className="btn btn-primary mt-2">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
