import React from "react";
import "./Landingpage.css";
import homeimage from "../images/10x_homepage.png";
import { Link } from "react-router-dom";

function Landing_page() {
  return (
    <div className="container-sm bg-secondary mt-5" style={{ width: "960px" }}>
      <div className="row">
        <div className="col-8 bg-secondary">
          <img
            src={homeimage}
            className="rounded float-start"
            alt="..."
            style={{ width: "650px" }}
          ></img>
        </div>
        <div className=" col-4 bg-secondary">
          <center>
            <form
              style={{
                background: "orange",
                marginTop: "250px",
                "border-radius": "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "45px",
                  fontWeight: "bolder",
                }}
              >
                Instaclone
              </h2>
              <button
                className="btn btn-danger btn-lg"
                style={{
                  margin: "auto",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                <Link id="enter_link" to="/Postview">
                  Login/Sign up
                </Link>
              </button>
            </form>
          </center>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "50px",
            }}
          >
            <span
              style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}
            >
              Powered by{"  "}
            </span>
            <br />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>
              <img
                style={{ width: "100px" }}
                src="./appimages/firebaselogo.jpg"
              ></img>
            </p>
            <p>
              <img
                style={{
                  width: "75px",
                  marginLeft: "20px",
                }}
                src="./appimages/mongodblogo.jpg"
              ></img>
            </p>
          </div>
          <h3 style={{ textAlign: "center" }}>
            App created by:
            <a
              href="https://www.linkedin.com/in/rama-krishna-desala-719749107/"
              target="_blank"
              style={{ fontWeight: "bold", color: "white", fontSize: "15px" }}
            >
              Rama Krishna Desala
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Landing_page;
