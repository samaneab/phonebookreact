import React from "react";
import "./Log.css";
import logo from "../assets/image/Iran_transfo_logo.svg.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { json } from "react-router";

export const Log = () => {
  const history = useHistory();
  // form handeling
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const userName = data.get("userName");
    const password = data.get("password");
    console.log(userName);

    const apiURL = `http://127.0.0.1:3000/login`;
    axios.post(apiURL).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user-info", JSON.stringify(response.data));
        history.push("/");
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <img src={logo} className="logo" />
            <h3 className="titr">ورود</h3>
          </div>
          <div className="card-body">
            <form action="/login" method="Post" onSubmit={(event) => handleFormSubmit(event)}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-square"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control myinputs"
                  placeholder="نام کاربری"
                  name="userName"
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-key-fill"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control myinputs"
                  placeholder="رمزعبور"
                  name="password"
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" className="check" />
                مرا به خاطر بسپار!
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary login_btn">
                  ورود
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
