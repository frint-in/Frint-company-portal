import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./internshipCard.scss";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InternshipCard = (props) => {
  const navigate = useNavigate();

  const host = "http://localhost:3000/api";

  const [company, setCompany] = useState();

  const { internship } = props;

  const [color, setColor] = useState([
    "#fee4cb",
    "#e9e7fd",
    "#FFFFFF",
    "#ffd3e2",
    "#c8f7dc",
    "#d5deff",
  ]);

  const internshipApplicants = [
    {
      id: 23232,
      number: 23,
    },
    {
      id: 23231,
      number: 23,
    },
    {
      id: 23233,
      number: 23,
    },
  ];

  useEffect(() => {
    setCompany(JSON.parse(localStorage.getItem("my-company")));
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await axios.delete(
      `${host}/internship/delete/${internship.companyId}/${internship._id}`,
      {
        headers: {
          authorization: `Bearer ${company.accessToken}`,
        },
      }
    );

    response && navigate(0);
  };

  const infoBtn = useRef();

  return (
    <div className="project-box-wrapper">
      <div
        className="project-box"
        style={{
          backgroundColor: color[Math.floor(Math.random() * color.length)],
        }}
      >
        <div className="project-box-header">
          <span>December 10, 2020</span>
          <div className="more-wrapper">
            <button
              className="project-btn-more"
              onClick={() => {
                infoBtn.current.classList.toggle("showInfo");
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
                className="feather feather-more-vertical"
              >
                <circle cx={12} cy={12} r={1} />
                <circle cx={12} cy={5} r={1} />
                <circle cx={12} cy={19} r={1} />
              </svg>
            </button>
            <ul className="moreInfo" ref={infoBtn}>
            <li>
               
               <Link to={`/viewEntry/${internship._id}`} style={{textDecoration: 'none'}}>More Info</Link>
           </li>
              <li>
               
                  <Link to={`/editListing/${internship._id}`} style={{textDecoration: 'none'}}>Edit Listing</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">
            {internship && internship.title ? internship.title : "No title"}
          </p>
          <p className="box-content-subheader">
            {internship && internship.type
              ? internship.type
              : "No Information Provided"}
          </p>
        </div>
        <div className="box-progress-wrapper">
          <p className="box-progress-header">Progress</p>
          <div className="box-progress-bar">
            <span
              className="box-progress"
              style={{ width: "60%", backgroundColor: "#ff942e" }}
            />
          </div>
          <p className="box-progress-percentage">60%</p>
        </div>
        <div className="project-box-footer">
          <div className="participants">
            {/* <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                            alt="participant"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                            alt="participant"
                        /> */}
            {/* <button
                            className="add-participant"
                            style={{ color: "#ff942e" }}
                        >
                            
                            <Edit />
                        </button> */}
            <button
              className="add-participant"
              style={{ color: "#ff942e" }}
              onClick={handleDelete}
            >
              <Delete />
              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={12}
                                height={12}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-plus"
                            >
                                <path d="M12 5v14M5 12h14" />
                            </svg> */}
            </button>
          </div>
          <div className="days-left" style={{ color: "#ff942e" }}>
            2 Days Left
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
