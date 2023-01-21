import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./editListing.scss";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ArrowBack } from "@mui/icons-material";
import { useSelector } from "react-redux";

const EditListing = () => {
  const host = import.meta.env.VITE_HOST;
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate()

  const { internshipId } = useParams();

  const [requiredInternship, setRequiredInternship] = useState();

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

  useEffect(() => {
    requiredInternship &&
      setCreds({
        title: requiredInternship.title ? requiredInternship.title : "",
        type: requiredInternship.type ? requiredInternship.type : "",
        location: requiredInternship.location
          ? requiredInternship.location
          : "",
        description: requiredInternship.description
          ? requiredInternship.description
          : "",
        requirements: requiredInternship.requirements
          ? requiredInternship.requirements
          : "",
        perks: requiredInternship.perks ? requiredInternship.perks : "",
        stipend: requiredInternship.stipend ? requiredInternship.stipend : "",
        availablePosts: requiredInternship.availablePosts
          ? requiredInternship.availablePosts
          : "",
      });
  }, [requiredInternship]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateInternship = async () => {
      const response = axios.put(
        `${host}/company/internship/edit/${internshipId}`,
        creds,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      return response
    };
    const response = updateInternship()
    response && navigate('/')
  };

  return (
    <div className="editListing">
      <Link to="/" className="back-btn">
        <ArrowBack />
      </Link>
      <div className="container">
        <h1 className="title">Edit Internship Details</h1>
        <form className="grid" onSubmit={handleSubmit}>
          <div className="form-group a">
            <label htmlFor="name">Title</label>
            <input
              id="name"
              type="text"
              value={creds.title}
              onChange={(e) => setCreds({ ...creds, title: e.target.value })}
            />
          </div>
          <div className="form-group b">
            {/* <label htmlFor="first-name">Type</label>
            <input id="first-name" type="text" /> */}

            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={creds.type}
                label="Age"
                onChange={(e) =>
                  e.target.value !== "" &&
                  setCreds({ ...creds, type: e.target.value })
                }
              >
                {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div className="form-group email-group">
            <label htmlFor="email">Location</label>
            <input
              id="email"
              type="text"
              value={creds.location}
              onChange={(e) => setCreds({ ...creds, location: e.target.value })}
            />
          </div>
          <div className="form-group phone-group">
            <label htmlFor="phone">No Of Available Posts</label>
            <input
              id="phone"
              type="number"
              value={creds.availablePosts}
              onChange={(e) =>
                setCreds({ ...creds, availablePosts: e.target.value })
              }
            />
          </div>
          <div className="textarea-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              // defaultValue={""}
              value={creds.description}
              onChange={(e) =>
                setCreds({ ...creds, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="stipend">Stipend</label>
            <input
              id="stipend"
              type="text"
              value={creds.stipend}
              onChange={(e) => setCreds({ ...creds, stipend: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="perks">Perks</label>
            <textarea
              id="perks"
              rows={3}
              // defaultValue={""}
              value={creds.perks}
              onChange={(e) => setCreds({ ...creds, perks: e.target.value })}
            />
          </div>
          <div className="textarea-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              // defaultValue={""}
              value={creds.requirements}
              onChange={(e) =>
                setCreds({ ...creds, requirements: e.target.value })
              }
            />
          </div>
          <div className="button-container">
            <button className="button">Update Now</button>
          </div>
        </form>
        {/* <div className="checkboxes">
          <div className="checkbox-group">
            <input id="newsletter" type="checkbox" />
            <label htmlFor="newsletter">
              Je souhaite recevoir la newsletter
            </label>
          </div>
          <div className="checkbox-group">
            <input id="newsletter-partners" type="checkbox" />
            <label htmlFor="newsletter-partners">
              Je souhaite recevoir la newsletter des partenaires
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EditListing;
