import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Editpost(props) {
  const location = useLocation();
  const postId = location.state.postId;
  const mongoose_post_id = postId[0];
  const [textfield, settextfield] = useState({ title: "", body: "" });
  const [filefield, setfiledfield] = useState(null);
  const { title, body } = textfield;
  const ontextFieldHandler = (ele) => {
    settextfield({ ...textfield, [ele.target.name]: ele.target.value });
    console.log(textfield);
  };
  const onfileFieldHandler = (ele) => {
    setfiledfield(ele.target.files[0]);
    console.log(filefield);
  };
  const onpostsubmitHandler = (ele) => {
    ele.preventDefault();
    const alldataedit = new FormData();
    alldataedit.append("title", textfield.title);
    alldataedit.append("body", textfield.body);
    alldataedit.append("imagefile", filefield);
    async function postdata() {
      await axios
        .put(
          `https://instaclone-be-tenx.herokuapp.com/updatepost/${mongoose_post_id}`,
          alldataedit,
          {
            headers: {
              "Content-Type": "multip art/form-data",
            },
          }
        )
        .then((res) => {
          alert(" post updated successfully");
        })
        .catch((e) => {
          console.log(e);
          alert("Post not updated");
        });
    }
    postdata();
    // alldata.append("imagefile", "ranjlfdszlkfmklmxdlv");
    // alldata.append("imsdsile", "ranjlfdszlkfmklmxdlv");
    // alldata.append("title", textfield.title);
    // alldata.append("body", textfield.body);
    console.log(alldataedit);
  };
  return (
    <div className="container-xl bg-danger ">
      <form onSubmit={onpostsubmitHandler}>
        <div className="form-gropu row">
          <div className="col-sm-12">
            <h1
              style={{
                color: "white",
                fontSize: "40px",
                textAlign: "center",
                fontWeight: "bolder",
              }}
            >
              Update post
            </h1>
          </div>
        </div>
        <div class="form-group row" style={{ marginTop: "50px" }}>
          <label
            for="Post title"
            class="col-sm-2 col-form-label"
            style={{ fontSize: "20px", color: "white" }}
          >
            Post title
          </label>
          <div class="col-sm-10 ml-0" style={{ marginTop: "10px" }}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={ontextFieldHandler}
              class="form-control"
              id="inputPassword"
              placeholder="Enter title"
              style={{ fontSize: "20px" }}
            ></input>
          </div>
        </div>
        <div class="form-group row" style={{ marginTop: "50px" }}>
          <label
            for="Post title"
            class="col-sm-2 col-form-label"
            style={{ fontSize: "20px", color: "white" }}
          >
            Image
          </label>
          <div class="col-sm-10 ml-0" style={{ marginTop: "10px" }}>
            <input
              type="file"
              name="imagefile"
              onChange={onfileFieldHandler}
              class="form-control"
              id="inputPassword"
              placeholder="Enter title"
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
            About post
          </label>
          <div class="col-sm-10 ml-0">
            <input
              type="text"
              name="body"
              value={body}
              onChange={ontextFieldHandler}
              class="form-control"
              id="inputPassword"
              placeholder="Write something......."
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
            <input type="submit" value="Update Post"></input>
          </div>
        </div>
        <button
          type="button"
          className="btn bg-light "
          style={{
            padding: "10px",
            fontSize: "20px",
            marginLeft: "550px",
            marginBottom: "10px",
            textDecoration: "none",
          }}
        >
          <Link
            to={"/postview"}
            style={{ textDecoration: "none", color: "rgb(220 53 69)" }}
          >
            Back
          </Link>
        </button>
      </form>
    </div>
  );
}
