import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

  let history = useHistory();

  const [creds, setCreds] = useState({email: "", password: ""})

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success) {
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert(json.message, "success");
    } else {
      props.showAlert(json.error, "danger");
    }
  }

  const onChange = (e) => {
    setCreds({...creds, [e.target.name] : e.target.value});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={creds.email} onChange={onChange} name="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={creds.password} onChange={onChange} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </>
  )
}

export default Login