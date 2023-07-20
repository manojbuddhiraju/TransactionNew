import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Middle() {

  const navigate = useNavigate();

  return (
    <div className="row justify-content-center">
      <Navbar></Navbar>
      <div className="col-auto">
        <br></br>
        <form>
            <br>
            </br>
            <table className="table table-sm table-responsive">
              <tr>
                <td>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={() => navigate('/Register')}>Register Farmer</button>
                </td>
                <td>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={() => navigate('/Verification')}>Validate Farmer Details</button>
                </td>
                
              </tr>
            </table>
        </form>
      </div>
    </div>
  );
}