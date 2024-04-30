import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import AboutUs from "./AboutUs";
import Login from "./Login";
import SignUp from "./SignUp";
import Listings from "./Listing";
import YourApplications from "./YourApplications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/listings" element={<Listings />}></Route>
      <Route path="/about-us" element={<AboutUs />}></Route>
      <Route path='/applications' element={<YourApplications />}></Route>
    </Routes>
  );
}

export default App;
