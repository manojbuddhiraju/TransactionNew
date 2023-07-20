import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (e) => {
    debugger
    console.log(userData);
    setIsLoading(true);
    const response = await axios.get(
      'https://localhost:7047/Login?username='+userData.username+'&password='+userData.password
    ).then((result) => {
        if(result.data === "verified")
        {
           window.location.href = "Middle"
        }
        else
        {
            alert("Not a valid user. Please login with proper credentials");
        }
    })
    setIsLoading(false) 
  };

  return (
    <div className="row justify-content-center">
      <Navbar></Navbar>
      <div className="col-auto">
        {
          isLoading ? <LoadingSpinner></LoadingSpinner> :
          <div>
            <br></br>
            <form>
              <br></br>
              <table className="table table-sm table-responsive">
                <tr>
            <h3> Login </h3>
                </tr>
                <tr>
            <td><label htmlFor="username" className="col-form-label">UserName :</label></td>
            <td>
              <input type="text" className="form-control form-control-sm" id="username" name="username" onChange={handleChange} value={userData.username} required />
            </td>
                </tr>
                <tr>
            <td><label htmlFor="password" className="col-form-label">Password :</label></td>
            <td>
              <input type="text" className="form-control form-control-sm" id="password" name="password" onChange={handleChange} value={userData.password} required />
            </td>
                </tr>
                <tr>
            <td>
              <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
            </td>
                </tr>
              </table>
            </form>
          </div>
        }
      </div>
    </div>
  );
}