import axios from "axios";
import React, { useState } from "react";

export default function Loginpage() {
  const [loigindata, setlogindata] = useState({ username: "", password: "" });
  const { username, password } = loigindata;
  function handleuserdatails(ele) {
    setlogindata({ ...loigindata, [ele.target.name]: ele.target.value });
    console.log(loigindata);
  }
  const loginauth = () => {};
  return (
    <div className="container-xl bg-danger ">
      <form onSubmit={loginauth}>
        <div class="form-group row" style={{ marginTop: "50px" }}>
          <label
            for="inputPassword"
            class="col-sm-2 col-form-label"
            style={{ fontSize: "20px", color: "white" }}
          >
            Email
          </label>
          <div class="col-sm-10 ml-0" style={{ marginTop: "10px" }}>
            <input
              type="email"
              name="username"
              value={username}
              onChange={handleuserdatails}
              class="form-control"
              id="inputPassword"
              placeholder="Username"
              style={{ fontSize: "20px" }}
            ></input>
          </div>
        </div>

        <div class="form-group row" style={{ marginTop: "50px" }}>
          <label
            for="inputPassword"
            class="col-sm-2 col-form-label"
            style={{ fontSize: "20px", color: "white" }}
          >
            Password
          </label>
          <div class="col-sm-10 ml-0">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleuserdatails}
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              style={{ fontSize: "20px" }}
            ></input>
          </div>
          <div
            className="col-sm-3"
            style={{
              margin: "auto",
              padding: "15px",
              fontSize: "25px",
              marginLeft: "550px",
              marginBottom: "10px",
              textDecoration: "none",
              fontWeight: "bolder",
              color: "rgb(220 53 69)",
            }}
          >
            <input
              type="submit"
              claaName="btn bg-light p-2"
              value="Login"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
