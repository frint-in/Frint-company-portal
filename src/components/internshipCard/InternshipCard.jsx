import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./internshipCard.scss";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import DraggableDialog from "../alert/Alert";

const InternshipCard = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const host = import.meta.env.VITE_HOST;
  const { internship } = props;
  const navigate = useNavigate();
  const infoBtn = useRef();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [applicantsNo, setApplicantsNo] = useState(0);

  const [initialDay, SetinitialDay] = useState();
  const [initialMonth, setInitialMonth] = useState();
  const [initialYear, setInitialYear] = useState();

  const week = ["Sun,", "Mon,", "Tue,", "Wed,", "Thurs,", "Fri,", "Sat,"];
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

  useEffect(() => {
    SetinitialDay(new Date(internship.createdAt).getDate());
    setInitialMonth(months[new Date(internship.createdAt).getMonth()]);
    setInitialYear(new Date(internship.createdAt).getFullYear());
  }, [internship]);

  const [percentageTime, setPercentageTime] = useState();

  useEffect(() => {
    let initialTimeDifference =
      new Date(internship.lastDate).getTime() -
      new Date(internship.createdAt).getTime();
    let finalTimeDifference =
      new Date(internship.lastDate).getTime() - new Date().getTime();
    let initialSeconds = Math.floor(initialTimeDifference / 1000);
    let finalSeconds = Math.floor(finalTimeDifference / 1000);
    setPercentageTime(((initialSeconds - finalSeconds) / initialSeconds) * 100);
  }, [internship]);

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

  const handleDelete = async (e) => {
    e.preventDefault();
    setOpen(false);
    const response = await axios.delete(
      `${host}/company/internship/delete/${internship._id}`,
      {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    response && navigate(0);
  };

  return (
    <div className="project-box-wrapper">
      {/* {(percentageTime <=100 && percentageTime>=0)&&( */}
      <div
        className="project-box"
        style={{
          backgroundColor: color[Math.floor(Math.random() * color.length)],
        }}
      >
        <div className="project-box-header">
          <span>
            {initialMonth} {initialDay}, {initialYear}
          </span>
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
                <Link
                  to={`/viewEntry/${internship._id}`}
                  style={{ textDecoration: "none", margin: "8px" }}
                >
                  More Info
                </Link>
              </li>
              <li>
                <Link
                  to={`/editListing/${internship._id}`}
                  style={{ textDecoration: "none", margin: "4px" }}
                >
                  Edit Listing
                </Link>
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
          <p className="box-progress-header">Time Remaining</p>
          <div className="box-progress-bar">
            <span
              className="box-progress"
              style={{
                width: `${percentageTime}%`,
                backgroundColor: "#ff942e",
              }}
            />
          </div>
          <p className="box-progress-percentage">{~~percentageTime}%</p>
        </div>
        <div className="project-box-footer">
          <div className="participants">
          
            <DraggableDialog
              styleBtn={{ color: "#ff942e" }}
              name="add-participant"
              onClick={handleDelete}
              content={<Delete />}
              message="Are you sure you want to perform the action"
              open={open}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              handleConfirm={handleDelete}
            />
          </div>
          <div className="days-left" style={{ color: "#ff942e" }}>
            {applicantsNo} Applicants
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default InternshipCard;
