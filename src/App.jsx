import "./App.css";
import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import EditSettings from "./pages/editSettings/EditSettings";
import ViewEntry from "./pages/veiwEntry/ViewEntry";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditListing from "./components/editListing/EditListing";
import { useSelector } from "react-redux";
import PasswordReset from "./components/passwordReset/PasswordReset";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";


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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

          
          <Route path="/editListing/:internshipId" element={currentUser ? <EditListing /> : <Auth />} />
          <Route path="/viewEntry/:internshipId" element={currentUser ? <ViewEntry />  : <Auth /> } />
          <Route path="/settings" element={currentUser ?  <EditSettings /> : <Auth />} />
        </Routes>
      </BrowserRouter>
      {/* <DraggableDialog message="Are you sure you want to perform the action" /> */}
    </>
  );
}

export default App;
