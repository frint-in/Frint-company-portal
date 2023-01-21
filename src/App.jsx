import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Auth from "./pages/auth/Auth";
import Calender from "./pages/calender/Calender";
import DashBoard from "./pages/dashboard/DashBoard";
import Settings from "./pages/settings/Settings";
import EditSettings from "./pages/editSettings/EditSettings";
import ViewEntry from "./pages/veiwEntry/ViewEntry";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditListing from "./components/editListing/EditListing";
import { useSelector } from "react-redux";


function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={currentUser ? <DashBoard /> : <Auth />} />
          <Route
            path="/auth"
            element={currentUser ? <Navigate to="/" replace /> : <Auth />}
          />
          <Route path="/editListing/:internshipId" element={<EditListing />} />
          <Route path="/viewEntry/:internshipId" element={<ViewEntry />} />
          <Route path="/settings" element={<EditSettings />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
