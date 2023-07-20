import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import RegisterSubmit from './components/RegisterSubmit';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DataVerification from './components/DataVerification';
import Login from './components/Login';
import Middle from './components/Middle';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<RegisterSubmit />} /> 
        <Route path="/Transaction" element={<App />} />
        <Route path="/Verification" element={<DataVerification />} />
        <Route path="/Middle" element={<Middle />} />
      </Routes>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
