import "./App.css";
import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
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
          <Route path="/editListing/:internshipId" element={currentUser ? <EditListing /> : <Auth />} />
          <Route path="/viewEntry/:internshipId" element={currentUser ? <ViewEntry />  : <Auth /> } />
          <Route path="/settings" element={currentUser ?  <EditSettings /> : <Auth />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
