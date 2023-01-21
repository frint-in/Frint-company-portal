import React, { useState } from "react";
import AddInternship from "../../components/addInternship/AddInternship";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./calender.scss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {

    const [date, setDate] = useState(new Date())

  return (
    <>
      <AddInternship />
      <div className="calenderMain">
        <div className="app-container">
          <Navbar />
          <div className="app-content">
            <Sidebar />

            <div className="projects-section">
              <div
                className="calendar"
                ng-controller="calendarController as calendar"
              >
                <div className="calendar_left">
                  
                <Calendar onChange={setDate} value={date} showNavigation={true} />
                  
                </div>
                <div className="calendar_right">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
