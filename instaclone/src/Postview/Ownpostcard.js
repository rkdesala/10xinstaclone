import React from "react";
import { Link } from "react-router-dom";
import Postview from "./Postview";

export default function Ownpostcard(props) {
  return (
    <div
      class="card mt-2 ml-4 mx-auto "
      style={{
        width: "40rem",
        border: "3px rgb(220 53 69) solid",
        borderRadius: "15px",
      }}
    >
      <div class="card-body">
        <div className="row ">
          <div className="col-sm-6">
            <h3 class="card-text m-1">Title: {props.namee}</h3>
          </div>
          <div className="col-sm-6">
            <button
              onClick={() => props.postDeleteHandler(props.postid)}
              className="btn p-2 bg-danger m-1 ml-0"
              style={{ fontSize: "20px", fontWeight: "bolder", color: "white" }}
            >
              <span class="glyphicon glyphicon-remove-circle"></span>Delete
            </button>
            <button
              className="btn p-2 bg-danger m-1 me-0"
              style={{ fontSize: "20px", fontWeight: "bolder", color: "white" }}
            >
              <Link
                to={"/updatepost"}
                style={{ textDecoration: "none", color: "white" }}
                state={{ postId: [props.postid] }}
              >
                <span class="glyphicon glyphicon-edit"></span>Edit
              </Link>
            </button>
          </div>
        </div>
      </div>
      <img
        src={` https://instaclone-be-tenx.herokuapp.com/` + props.image}
        style={{ width: "390px", height: "250px", margin: "auto" }}
        class="card-img-top"
        alt="Post image"
      ></img>
      <div class="card-body">
        <span
          class="glyphicon glyphicon-heart m-1"
          style={{ color: "red", fontSize: "20px" }}
        >
          <span>10</span>
        </span>
        <span
          class="glyphicon glyphicon-comment m-1"
          style={{ color: "grey", fontSize: "20px" }}
        >
          <span style={{ color: "grey", marginLeft: "5px" }}>10</span>
        </span>
        <span
          style={{ float: "right", fontSize: "15px", fontWeight: "bolder" }}
        >
          {props.time}
        </span>
        <p class="card-text" style={{ fontSize: "15px", fontWeight: "bolder" }}>
          Body:{props.body}
        </p>
        <p class="card-text" style={{ fontSize: "15px", fontWeight: "bolder" }}>
          Owner:{props.owner}
        </p>
      </div>
    </div>
  );
}
