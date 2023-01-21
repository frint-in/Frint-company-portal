import React from "react";
import { useState, useEffect } from "react";
import "./addInternship.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AddInternship = () => {
  const host = import.meta.env.VITE_HOST;
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   console.log(currentUser)
  // }, []);

  const navigate = useNavigate();


  const initialValues = {
    title: "",
    type: "",
    location: "",
    description: "",
    requirements: "",
    perks: "",
    stipend: "",
    availablePosts: "",
  };
  const [creds, setCreds] = useState(initialValues);
  const [company, setCompany] = useState();


  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${host}/company/internship/new/`,
      {
        title: creds.title,
        type: creds.type,
        location: creds.location,
        description: creds.description,
        requirements: creds.requirements,
        perks: creds.perks,
        stipend: creds.stipend,
        availablePosts: creds.availablePosts,
      },
      {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    response && navigate(0);
  };

  useEffect(() => {
    setCompany(JSON.parse(localStorage.getItem("my-company")));
  }, []);

  return (
    <div className="newInternship">
      <input
        type="checkbox"
        name="showForm"
        id="showForm"
        className="showForm"
      />
      <div className="form">
        <h2>Add Internship</h2>
        <form onSubmit={handelSubmit}>
          <div className="left section">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={creds.title}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  title: e.target.value,
                })
              }
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={creds.type}
                onChange={(e) =>
                  setCreds({
                    ...creds,
                    type: e.target.value,
                  })
                }
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Full-Time">Full-Time</MenuItem>title
              </Select>
            </FormControl>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={creds.location}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  location: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="stipend"
              placeholder="Stipend"
              value={creds.stipend}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  stipend: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="availablePosts"
              placeholder="Number Of Available Posts"
              value={creds.availablePosts}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  availablePosts: e.target.value,
                })
              }
            />
            <textarea
              name="perks"
              placeholder="Perks"
              value={creds.perks}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  perks: e.target.value,
                })
              }
            />
          </div>
          <div className="right section">
            <textarea
              name="description"
              placeholder="Description"
              // required=""
              value={creds.description}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  description: e.target.value,
                })
              }
            />
            <textarea
              name="requirements"
              placeholder="Requirements"
              value={creds.requirements}
              required
              onChange={(e) =>
                setCreds({
                  ...creds,
                  requirements: e.target.value,
                })
              }
            />
          </div>
          <Button variant="outlined" type="submit" className="sendForm left">
            Submit
          </Button>
         
            <label htmlFor="showForm" className="closeFormLabel left label">

              Close

            </label>

        </form>
      </div>
    </div>
  );
};

export default AddInternship;
