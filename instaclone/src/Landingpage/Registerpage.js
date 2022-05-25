import { async } from "@firebase/util";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Postview from "../Postview/Postview";
export default function Registerpage() {
  const [regdata, setregdata] = useState({ email: "", password: "" });
  const [currentuser, setcurrentuser] = useState(null);
  const { email, password } = regdata;
  function handleuserdatails(ele) {
    setregdata({ ...regdata, [ele.target.name]: ele.target.value });
    console.log(regdata);
  }
  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Success");
      //console.log(user);
    } catch (err) {
      alert("Registration failed due to unknown reasons");
      //console.log(err.message);
    }
  };
  const loginauth = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("Sign In Success!!");
      //console.log(user);
    } catch (err) {
      alert("Sign In failed due to unknown reasons");
      //console.log(err.message);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (presentuser) => {
      setcurrentuser(presentuser);
    });
  });

  return (
    <div>
      {currentuser ? (
        <Postview currentuser={currentuser.email} />
      ) : (
        <div className="container-xl bg-danger ">
          <form>
            <div class="form-group row" style={{ marginTop: "50px" }}>
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "50px",
                  marginBottom: "50px",
                }}
              >
                Welcome to Instaclone
              </h1>
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
                  name="email"
                  value={email}
                  onChange={handleuserdatails}
                  class="form-control"
                  id="inputPassword"
                  placeholder="Email"
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
                <span>
                  {" "}
                  <input
                    onClick={loginauth}
                    type="submit"
                    claaName="btn bg-light p-2"
                    value="Login"
                  ></input>
                </span>
                <span>
                  <input
                    onClick={register}
                    type="submit"
                    claaName="btn bg-light p-2"
                    value="Register"
                    style={{ marginLeft: "10px" }}
                  ></input>
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
