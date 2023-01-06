import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  let history = useHistory();
  const [user, setUser] = useState({name:"", email: "", password: ""})

  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
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
    setUser({...user, [e.target.name] : e.target.value});
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup