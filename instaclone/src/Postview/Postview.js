import React, { useEffect, useState } from "react";
import Postcard from "./Postcard";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Registerpage from "../Landingpage/Registerpage";
import Ownpostcard from "./Ownpostcard";

export default function Postview(props) {
  const [dat, setDat] = useState([]);
  const [mypostdata, setmypostdata] = useState([]);
  const [currentuserstatus, setcurrentuserstatus] = useState(true);

  const fetchdat = () => {
    axios
      .get("https://instaclone-be-tenx.herokuapp.com/posts")
      .then((res) => {
        setDat(res.data);
        setmypostdata([]);
        //console.log(res.data);
      })
      .catch((e) => {
        alert("failed in fetching posts...Please Retry");
        console.log(e.message());
      });
  };
  const fetchmyposts = () => {
    onAuthStateChanged(auth, (presentuser) => {
      setcurrentuserstatus(presentuser);
    });
    axios
      .get(
        `https://instaclone-be-tenx.herokuapp.com/myposts/${currentuserstatus.email}`
      )
      .then((res) => {
        setmypostdata(res.data);
        setDat([]);
      })
      .catch((e) => {
        alert(`fetching own posts failed due to ${e.message}`);
      });
  };
  const postDeleteHandler = async (postid) => {
    await axios
      .delete(`https://instaclone-be-tenx.herokuapp.com/delete/${postid}`)
      .then((res) => {
        alert("post deleted successfully");
        fetchdat();
      })
      .catch((e) => {
        alert("post deletion failed");
        fetchdat();
      });
  };
  const logout = async () => {
    try {
      await signOut(auth);
      alert("successfully loged out");
    } catch {
      alert("logout failed tplease try again");
    }
  };

  useEffect((e) => {
    fetchdat();
    onAuthStateChanged(auth, (presentuser) => {
      setcurrentuserstatus(presentuser);
    });
  }, []);

  return (
    <div>
      {currentuserstatus ? (
        <div className="container-fluid bg-danger" style={{ height: "1000vh" }}>
          <div className="container-xl bg-dark" style={{ height: "1000vh" }}>
            <div className="container-fluid sticky-top  bg-danger p-2 text-light">
              <div className="row">
                <div className="col-6 ">
                  {" "}
                  <span
                    class="glyphicon glyphicon-camera mt-1"
                    style={{ fontSize: "50px" }}
                  >
                    Instaclone
                  </span>
                  <span style={{ fontSize: "25px" }}>
                    User:{currentuserstatus.email}
                  </span>
                </div>
                <div className="col-6 ">
                  <div className="row">
                    <div className="col-3">
                      <button
                        onClick={fetchmyposts}
                        type="button"
                        className="btn bg-light "
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          textDecoration: "none",
                        }}
                      >
                        <Link
                          to={""}
                          style={{
                            textDecoration: "none",
                            color: "rgb(220 53 69)",
                          }}
                        >
                          <span class="glyphicon glyphicon-picture"></span> My
                          Posts
                        </Link>
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        onClick={fetchdat}
                        type="button"
                        className="btn bg-light "
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          textDecoration: "none",
                        }}
                      >
                        <Link
                          to={"/postview"}
                          style={{
                            textDecoration: "none",
                            color: "rgb(220 53 69)",
                          }}
                        >
                          <span class="glyphicon glyphicon-globe"></span>{" "}
                          Allposts
                        </Link>
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn bg-light "
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          textDecoration: "none",
                        }}
                      >
                        <Link
                          to={"/addpost"}
                          style={{
                            textDecoration: "none",
                            color: "rgb(220 53 69)",
                          }}
                        >
                          <span class="glyphicon glyphicon-plus"></span> Add
                          Post
                        </Link>
                      </button>
                    </div>
                    <div className="col-3">
                      {" "}
                      <button
                        onClick={logout}
                        type="button"
                        className="btn bg-light  me-0"
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          color: "rgb(220 53 69)",
                        }}
                      >
                        <Link
                          to={"/"}
                          style={{
                            textDecoration: "none",
                            color: "rgb(220 53 69)",
                          }}
                        >
                          <span class="glyphicon glyphicon-home"></span> Logout
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
    className="card bg-success mt-3"
    style={{ width: "400px", height: "250px" }}
  >
    <h1>This is a Post</h1>
    <div className="container">
      <img src={homeimage} className="rounded float-start" alt="..."></img>
    </div>
  </div>  <div class="card-body">
      <p class="card-text">
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
    </div> */}

            <>
              {mypostdata.map((e, i) => {
                return (
                  <Ownpostcard
                    postDeleteHandler={postDeleteHandler}
                    namee={e.title}
                    body={e.body}
                    image={e.imagefile}
                    postid={e._id}
                    time={e.time}
                    owner={e.owner}
                  />
                );
              })}
              {dat.map((e, i) => {
                return (
                  <Postcard
                    postDeleteHandler={postDeleteHandler}
                    namee={e.title}
                    body={e.body}
                    image={e.imagefile}
                    postid={e._id}
                    time={e.time}
                    owner={e.owner}
                  />
                );
              })}
            </>
          </div>
        </div>
      ) : (
        <Registerpage />
      )}
    </div>
  );
}
