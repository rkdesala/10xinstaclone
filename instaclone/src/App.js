import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Landing_page from "./Landingpage/Landing_page";
import Postview from "./Postview/Postview";
import Postcard from "./Postview/Postcard";
import Loginpage from "./Landingpage/Loginpage";
import Addpost from "./Postview/Addpost";
import Editpost from "./Postview/Editpost";
import Registerpage from "./Landingpage/Registerpage";

function App() {
  return (
    <div className="Wrapper">
      <Routes>
        <Route path="/" element={<Landing_page />}></Route>
        <Route path="/postview" element={<Postview />}></Route>
        <Route path="/postcard" element={<Postcard />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/addpost" element={<Addpost />}></Route>
        <Route path="/updatepost" element={<Editpost />}></Route>
        <Route path="/Register" element={<Registerpage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
