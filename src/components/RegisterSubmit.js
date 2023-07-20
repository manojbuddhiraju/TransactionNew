import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function RegisterSubmit() {
    
    const [farmer, setFarmer] = useState({
        id:0,
        name: "",
        state: "",
        city: "",
        mobileNumber: "",
        totalAcres: 0,
        bagsProduced: 0,
        dNo:"",
        username:""
      });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (evt) => {
        setFarmer({
          ...farmer,
          [evt.target.name]: evt.target.value,
        });
      };
    
    const handleSubmit = async (e) => {
        setIsLoading(true);

        const response = await axios.post(
          "https://localhost:7047/AddFarmer",
          farmer
        ).then((result) => {
            debugger;
            console.log(result.data);
            if(result.data === "Added Farmer Details")
            {
                window.location.href = "Verification"
            }
            else
            {
                alert("details were not added. Please submit again");
            }
        })

        setIsLoading(false)
      };

    return (
     <div className="row justify-content-center">
      <Navbar> </Navbar>
      {isLoading ?  <LoadingSpinner /> :
       <div className="col-auto"> 
       <br></br>    
        <form>
            <br></br>
            <table className="table table-sm table-responsive">    
                <tbody>
                    <tr>
                        <td>
                            <h1>Farmer Registration</h1>
                        </td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={(e) => {window.location.href='Verification';}}>Validate Farmer Data</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                                <label htmlFor="name" className="col-form-label">Name : </label>
                        </td>
                        <td> 
                            <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={farmer.name} required/>         
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="state" className="col-form-label">State : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="state" name="state" onChange={handleChange} value={farmer.state} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="city" className="col-form-label">City : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="city" name="city" onChange={handleChange} value={farmer.city} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mobileNumber" className="col-form-label">Mobile Number : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="mobileNumber" name="mobileNumber" onChange={handleChange} value={farmer.mobileNumber} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="totalAcres" className="col-form-label">Total Acres : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="totalAcres" name="totalAcres" onChange={handleChange} value={farmer.totalAcres} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="bagsProduced" className="col-form-label">Bags Produced : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="bagsProduced" name="bagsProduced" onChange={handleChange} value={farmer.bagsProduced} required />  
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="dNo" className="col-form-label">Door No : </label>
                        </td>
                        <td>
                            <input type="text" className="form-control form-control-sm" id="dNo" name="dNo" onChange={handleChange} value={farmer.dNo} required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
      </div>
      }
     </div>
      
    );
  }