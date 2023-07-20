import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function DataVerification(){

    const [farmerData, setFarmerData] = useState({
        name: "",
        city: "",
        mobileNumber: "",
      });
      const [isLoading, setIsLoading] = useState(false);
    const handleChange = (evt) => {
        setFarmerData({
          ...farmerData,
          [evt.target.name]: evt.target.value,
        });
      };
    
    const handleSubmit = async (e) => {
        
        setIsLoading(true);
        const response = await axios.get(
          'https://localhost:7047/Farmers?Name='+farmerData.name+'&City='+farmerData.city+'&MobileNumber='+farmerData.mobileNumber
        ).then((result) => {
            if(result.data === "verified")
            {
               window.location.href = "Transaction"
            }
            else
            {
                alert("Not a valid user. Please Register details");
                window.location.href = "Middle"
            }
        })
        setIsLoading(false) 
      };

    return(
        <div className="row justify-content-center">
            <Navbar></Navbar>
            <div className="col-auto">
                {isLoading ? <LoadingSpinner /> :
                   <div>
                     <br></br>
                     <form>
                    <br></br>
                    <table className="table table-sm table-responsive">
                        <tbody>
                            <tr>
                                <td>
                                    <h3> Verify Farmer Details</h3>
                                </td>
                                <td>
                                <button type="button" className="btn btn-primary" onClick={(e) => {window.location.href='/';}}>Farmer Registration</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name" className="col-form-label">Name :</label>
                                </td>
                                <td>
                                    <input type="text" className="form-control form-control-sm" id="name" name="name" onChange={handleChange} value={farmerData.name} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="city" className="col-form-label">City :</label>
                                </td>
                                <td>
                                    <input type="text" className="form-control form-control-sm" id="city" name="city" onChange={handleChange} value={farmerData.city} required />
                                </td> 
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="mobileNumber" className="col-form-label">Mobile Number :</label>
                                </td>
                                <td>
                                    <input type="text" className="form-control form-control-sm" id="mobileNumber" name="mobileNumber" onChange={handleChange} value={farmerData.mobileNumber} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Verify</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                     </form>
                    </div>
                }
            </div>
        </div>
    );
}