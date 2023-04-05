import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import AddInternship from "../../components/addInternship/AddInternship";
import EditListing from "../../components/editListing/EditListing";
import InternshipCard from "../../components/internshipCard/InternshipCard";
import Navbar from "../../components/navbar/Navbar";
import NotificationCard from "../../components/notificationCard/NotificationCard";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const DashBoard = () => {
  const host = import.meta.env.VITE_HOST;
  const { currentUser } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false)

  const week = ["Sun,", "Mon,", "Tue,", "Wed,", "Thurs,", "Fri,", "Sat,"];
  const day = week[new Date().getDay()];
  const months = [
    "January",
    "Febrary",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[new Date().getMonth()];

  const listView = useRef();
  const gridView = useRef();
  const projectsList = useRef();

  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    const getAllCompanyInternship = async () => {
      setIsLoading(true)
        const res = await axios.get(`${host}/company/internship/all`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        })
        setIsLoading(false)
        setAllInternships(res.data)
    };
    currentUser && getAllCompanyInternship();
  }, [currentUser]);


  const updateInternship = async (internshipId, boolValue) => {
    setIsLoading(true)
    const response = axios.put(
      `${host}/company/internship/edit/${internshipId}`,
      {isActive: boolValue},
      {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    setIsLoading(false)
    return response
  };

  useEffect(() => {
    allInternships.map((internship) => {
      if(new Date(internship.lastDate) < new Date()){
        if(internship.isActive === true){
          updateInternship(internship._id, false)
          // console.log('working 1')
        }
      }
      else{
        if(internship.isActive === false){
          updateInternship(internship._id, true)
          // console.log('working')
        }
      }
    })
  }, [allInternships])

  const [activeInternships, setActiveInternships] = useState([]);

  useEffect(() => {
    const getAllCompanyInternship = async () => {
      setIsLoading(true)
        const res = await axios.get(`${host}/company/internship/active/all`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        })
        setActiveInternships(res.data)
        setIsLoading(false)
    };
    currentUser && getAllCompanyInternship();
  }, [currentUser]);


  // useEffect(() => {
  //   activeInternships ? setIsLoading(false): setIsLoading(true)
  // }, [activeInternships])
  
  

  return (
    <>
    {
      isLoading ? ( <Loader />) : (
<> 
<AddInternship />
      <div className="dashboard">
        <div className="app-container">
          <Navbar />
          <div className="app-content">
            <Sidebar />

            <div className="projects-section">
              <div className="projects-section-header">
                <p>Internship Listings</p>
                <p className="time">{`${day} ${new Date().getDate()} ${month} ${new Date().getFullYear()}`}</p>
              </div>
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{activeInternships ? activeInternships.length : 0}</span>
                    <span className="status-type">Active Internships</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">0</span>
                    <span className="status-type">Candidates Applied</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">{allInternships ? allInternships.length : 0}</span>
                    <span className="status-type">Total Internships</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">0</span>
                    <span className="status-type">Total Interns Hired</span>
                  </div>

                  <div className="item-status"></div>
                </div>
                <div className="view-actions">
                  <button
                    className="view-btn list-view"
                    ref={listView}
                    title="List View"
                    onClick={() => {
                      gridView.current.classList.remove("active");
                      listView.current.classList.add("active");
                      projectsList.current.classList.remove("jsGridView");
                      projectsList.current.classList.add("jsListView");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-list"
                    >
                      <line x1={8} y1={6} x2={21} y2={6} />
                      <line x1={8} y1={12} x2={21} y2={12} />
                      <line x1={8} y1={18} x2={21} y2={18} />
                      <line x1={3} y1={6} x2="3.01" y2={6} />
                      <line x1={3} y1={12} x2="3.01" y2={12} />
                      <line x1={3} y1={18} x2="3.01" y2={18} />
                    </svg>
                  </button>
                  <button
                    className="view-btn grid-view active"
                    ref={gridView}
                    title="Grid View"
                    onClick={() => {
                      gridView.current.classList.add("active");
                      listView.current.classList.remove("active");
                      projectsList.current.classList.remove("jsListView");
                      projectsList.current.classList.add("jsGridView");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-grid"
                    >
                      <rect x={3} y={3} width={7} height={7} />
                      <rect x={14} y={3} width={7} height={7} />
                      <rect x={14} y={14} width={7} height={7} />
                      <rect x={3} y={14} width={7} height={7} />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="project-boxes jsGridView" ref={projectsList}>
                {activeInternships &&
                  activeInternships.map((internship) => {
                    return (
                      <InternshipCard
                        key={internship._id}
                        internship={internship}
                      />
                    );
                  })}
                {(!activeInternships || activeInternships.length === 0) && (
                  <h2 style={{ marginBottom: 15, color: "var(--main-color)" }}>
                    No Internship Posted Yet!! Click on the Add Internship
                    Button available on the Navbar to get the Best Interns
                    Around the corner
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
</>
      )
    }
    {/* <Loader /> */}
      
    </>
  );
};

export default DashBoard;
