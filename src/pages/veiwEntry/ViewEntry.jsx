import React from "react";
import { useRef, useState, useEffect } from "react";
import AddInternship from "../../components/addInternship/AddInternship";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./viewEntry.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewEntry = () => {
  const host = import.meta.env.VITE_HOST;
  const { currentUser } = useSelector((state) => state.user);

  const { internshipId } = useParams();

  const [requiredInternship, setRequiredInternship] = useState();

  useEffect(() => {
    const getRequiredInternship = async () => {
      const response = await axios.get(
        `${host}/company/internship/find/${internshipId}`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setRequiredInternship(response.data);
    };

    getRequiredInternship();
  }, []);

  const [companyName, setCompanyName] = useState();

  useEffect(() => {
    const getComapnyName = async () => {
      const response = await axios.get(`${host}/company/info/get`, {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      setCompanyName(response.data.CompanyName);
    };

    getComapnyName();
  }, []);

  const columns = [
    { id: "Name", label: "Name", minWidth: 170 },
    { id: "CollegeName", label: "College", minWidth: 100 },
    { id: "Degree", label: "Degree", minWidth: 100 },
    { id: "Branch", label: "Branch", minWidth: 100 },
    { id: "Semester", label: "Semester", minWidth: 100 },
    { id: "Email", label: "Email", minWidth: 100 },
    { id: "PhoneNumber", label: "Phone Number", minWidth: 100 },
    { id: "CV", label: "CV", minWidth: 100 },
    { id: "Location", label: "Location", minWidth: 100 },
    { id: "skillSets", label: "skillSets", minWidth: 100 },
    { id: "currentlyWorkingAs", label: "Currently Working As", minWidth: 100 },
  ];

  function createData(
    Name,
    CollegeName,
    Degree,
    Branch,
    Semester,
    Email,
    PhoneNumber,
    CV,
    Location,
    skillSets,
    currentlyWorkingAs
  ) {
    return {
      Name,
      CollegeName,
      Degree,
      Branch,
      Semester,
      Email,
      PhoneNumber,
      CV,
      Location,
      skillSets,
      currentlyWorkingAs
    };
  }

  // useEffect(() => {
    
  // }, [applicantDetails])
  
  // const rows = [
    // applicantDetails &&{
    //   createData("India", "IN", 1324171354, 3287263),
    //   createData("China", "CN", 1403500365, 9596961),
    //   createData("Italy", "IT", 60483973, 301340),
    // }
  // ];

  const [rows, setRows] = useState([])

  // Handle
  const week = ["Sun,", "Mon,", "Tue,", "Wed,", "Thurs,", "Fri,", "Sat,"];
  let day = week[new Date().getDay()];
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [numberApplicants, setNumberApplicants] = useState(0)
  let verifiedApplicants = 0;

  const [applicants, setApplicants] = useState();
  const [applicantIds, setApplicantIds] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState([])

  useEffect(() => {
    const getRequiredApplicants = async () => {
      const res = await axios.get(
        `${host}/company/info/applicants/${internshipId}`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // console.log(res.data)
      setApplicants(res.data);
      // res.data && res.data.map(data => {
      //   setApplicants([...applicants, data.applicantId]);
      //   console.log(1)
      // })
    };
    getRequiredApplicants();
  }, [internshipId, currentUser]);


  useEffect(() => {
    applicants &&
      applicants.map((data) => {
        setApplicantIds([...applicantIds, data.applicantId]);
      });
    // applicants.map(String)
  }, [applicants]);


  useEffect(() => { 
    const getApplicants = async () => {
      const response = await axios.post(`${host}/company/info/getAppliedInterns`, {applicantIds: applicantIds})
      setApplicantDetails(response.data)
      setRows(response.data)
      setNumberApplicants(response.data.length)
      // console.log(response.data)
    }

    applicantIds.length!==0 && getApplicants()
  }, [applicantIds])
  
  


  return (
    <div className="viewEntry">
      <AddInternship />
      <div className="editSettings">
        <div className="app-container">
          <Navbar />
          <div className="app-content">
            <Sidebar />
            <div className="projects-section">
              <div className="projects-section-header">
                <p>
                  {requiredInternship && requiredInternship.title}{" "}
                  {companyName ? `@ ${companyName}` : ""}
                </p>
                <p className="time">{`${day} ${new Date().getDate()} ${month} ${new Date().getFullYear()}`}</p>
              </div>
              <hr />
              <div className="projects-section-header subheader1">
                <div className="valDeatails iconitext">
                  <AccessTimeIcon />
                  <p className="subheader1">
                    <span>
                      {" "}
                      {requiredInternship && requiredInternship.type}
                    </span>
                  </p>
                  <LocationOnIcon />
                  <p className="subheader1">
                    <span>
                      {" "}
                      {requiredInternship && requiredInternship.location}
                    </span>
                  </p>
                  <PeopleIcon />
                  <p className="subheader1">
                    <span>
                      {" "}
                      {requiredInternship && requiredInternship.available_posts}
                    </span>
                  </p>
                  <PaidIcon />
                  <p className="subheader1">
                    <span>
                      {" "}
                      {requiredInternship && requiredInternship.stipend}
                    </span>
                  </p>
                </div>
              </div>
              <hr />
              <div className="projects-section-header subheader1">
                <p className="subheader1">
                  <h1> Description</h1>
                  <p>
                    <span>
                      {requiredInternship && requiredInternship.description}
                    </span>
                  </p>
                  <h1> Requirement</h1>
                  <p>
                    <span>
                      {requiredInternship && requiredInternship.requirements}
                    </span>
                  </p>
                  <h1> Perks</h1>
                  <p>
                    <span>
                      {requiredInternship && requiredInternship.perks}
                    </span>
                  </p>
                </p>
              </div>
              <hr />
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{numberApplicants}</span>
                    <span className="status-type">Applicants</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">{verifiedApplicants}</span>
                    <span className="status-type">Verified Applicants</span>
                  </div>
                  <div className="item-status"></div>
                </div>
                <div className="view-actions"></div>
              </div>
              <div className="project-boxes jsListView">
                {numberApplicants > 0 ? (
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                ) : (
                  <h1 style={{ textAlign: "center", marginBottom: "2em" }}>
                    {" "}
                    No Applicants has applied yet
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEntry;
