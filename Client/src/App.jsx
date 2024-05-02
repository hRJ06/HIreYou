import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import AboutUs from "./AboutUs";
import Login from "./Login";
import SignUp from "./SignUp";
import Listings from "./Listing";
import YourApplications from "./YourApplications";
import ApplicationsPage from "./Applications";
import Organization from "./Organization";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/listings" element={<Listings />}></Route>
      <Route path="/about-us" element={<AboutUs />}></Route>
      <Route path='/applications' element={<YourApplications />}></Route>
      <Route path="/applications/:listingId" element={<ApplicationsPage />} />
      <Route path="/organization/:organizationId" element={<Organization/>} />
    </Routes>
  );
}

export default App;
