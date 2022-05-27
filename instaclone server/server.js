const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const app = express();
var fs = require("fs");
const path = require("path");
// https://instaclone-be-tenx.herokuapp.com
///////////////////////////////////////
var bodyparser = require("body-parser");
app.use(bodyparser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//////////////////////////////////////////
const cors = require("cors");
app.use(cors());
//{ origin: "https://instaclone-fe-tenx.herokuapp.com" }
//{ origin: "http://localhost:3000" }
//dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
//////////////////////////////////////
const mongoose = require("mongoose");
const mongo_user_details = require("./Schemas/userSchema");
const mongo_post_datails = require("./Schemas/Postschema");
const { response } = require("express");
const res = require("express/lib/response");
mongoose.connect(
  Process.env.Mongo_URL,
  function (error) {
    console.log(error);
  }
);

//mongodb://localhost/Instaclone
///////////////////////////////////////Multer/////////////////////////////
app.use("/images", express.static("images"));
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine }); ///storage property takes starage engine property
app.use("/images", express.static("images"));
/////////////////////////////////////////////////////////////////////////
app.get("/welcome", (request, response) => {
  response.send([
    { status: "ok", message: "welcome to instaclone backend server" },
  ]);
});

app.get("/posts", async function (request, response) {
  const all_posts = await mongo_post_datails.find();
  //console.log(all_posts);
  response.send(all_posts);
});
//////////////////////////////////////////own posts///////////////
app.get("/myposts/:mail", async function (request, reponse) {
  console.log(request.params.mail);
  const all_posts = await mongo_post_datails.find();
  const mypostsrequested = all_posts.filter((ele) => {
    return ele.owner == request.params.mail;
  });
  reponse.send(mypostsrequested);
});

///////////////////////////////Update POST////////////////////////////////////////
app.put(
  "/updatepost/:id",
  upload.single("imagefile"),
  async (request, response) => {
    // const deletepost = await mongo_post_datails.findById(request.params.id);
    // const postpath = deletepost.imagefile;
    // const filepatharray = postpath.split("/");
    // const filenametodelete = filepatharray[filepatharray.length - 1];
    // console.log(filenametodelete);
    // fs.unlink(`./images/${filenametodelete}`, function (err) {
    //   if (err) throw err;
    //   console.log("File deleted!");
    // });
    const image_path = "images/" + request.file.filename;
    const d = new Date();
    await mongo_post_datails.findByIdAndUpdate(request.params.id, {
      $set: {
        title: request.body.title,
        body: request.body.body,
        imagefile: image_path,
        time: `on ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`,
      },
    });
    // console.log(request.params.id);
    // console.log(request.body);
    response.end();
  }
);
//////////////////////////////delete POST///////////////////////////////////
app.delete("/delete/:id", async (request, response) => {
  // console.log(request.params.id);
  // const deletepost = await mongo_post_datails.findById(request.params.id);
  // const postpath = deletepost.imagefile;
  // const filepatharray = postpath.split("/");
  // const filenametodelete = filepatharray[filepatharray.length - 1];
  // //console.log(filenametodelete);
  // fs.unlink(`./images/${filenametodelete}`, function (err) {
  //   if (err) throw err;
  //   console.log("File deleted!");
  // });
  await mongo_post_datails.deleteOne({
    _id: mongoose.Types.ObjectId(request.params.id),
  });
  response.end();
});
//////////////////////////////////////////////////////////////////////
app.post(
  "/addpost",
  upload.single("imagefile"),
  async function (request, reponse) {
    const image_path = "images/" + request.file.filename;
    const d = new Date();
    const addpostdetails = {
      title: request.body.title,
      body: request.body.body,
      imagefile: image_path,
      time: `on ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`,
      owner: request.body.owner,
    };
    await mongo_post_datails.create(addpostdetails);
    // response.send({ status: "ok" });
    reponse.end();
  }
);
app.listen(PORT, () => {
  console.log("server started on 5000");
});
