import React from 'react'
import { useRef, useState, useEffect } from 'react'
import AddInternship from '../../components/addInternship/AddInternship'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './settings.scss'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const Settings = () => {
  const initialValues = {
    CompanyName: "frint",
    Name: "Rohan 'Verma",
    Designation: "Lorem ipsum",
    CompanyType: "EdTech",
    Email: "frint@example.com",
    WorkEmail: "frint@example.com",
    PhoneNumber: "9898989898",
    WhatsappNumber: "9898989898",
    Address: " lorem10 ",
    Password: "lplplplplppllpl"
  };

  const [formValues, setFormValues] = useState(initialValues);
  return (
    <>
      <AddInternship />
      <div className="settings">
        <div className="app-container">
          <Navbar />
          <div className="app-content">
            <Sidebar />

            <div className="projects-section">
              <div className="settings-page">
                <div className="settings-container">
                  <div className="page-title">
                    <h1>Account</h1>
                    <Button
                      variant="outlined"
                      type="edit"
                      className="sendForm left">
                      <EditIcon />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="settings-section">
                    <h2 className="settings-title">General Information</h2>
                    <div className="non-active-form">
                      {/* <p> */}
                        <div className="fieldName"> 
                          Company Name :
                        </div>
                        <div className='fieldValue'>
                          {formValues.CompanyName}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                          Name :
                        </div>
                        <div className='fieldValue'>
                          {formValues.Name}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                        Designation :
                        </div>
                        <div className='fieldValue'>
                          {formValues.Designation}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                        Company Type :
                        </div>
                        <div className='fieldValue'>
                          {formValues.CompanyType}
                        </div>
                      {/* </p> */}
                    </div>
                    
              
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Contact Details</h2>
                    <div className="non-active-form">
                      {/* <p> */}
                        <div className="fieldName"> 
                        Email :
                        </div>
                        <div className='fieldValue'>
                          {formValues.Email}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                        WorkEmail :
                        </div>
                        <div className='fieldValue'>
                          {formValues.WorkEmail}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                        PhoneNumber :
                        </div>
                        <div className='fieldValue'>
                          {formValues.PhoneNumber}
                        </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                    {/* <p> */}
                        <div className="fieldName"> 
                        WhatsappNumber :
                        </div>
                        <div className='fieldValue'>
                          {formValues.WhatsappNumber}
                        </div>
                      {/* </p> */}
                    </div>
                    
              
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">My profile</h2>
                    <form className="form my-form">
                      <div className="img-upload-container">
                        <label
                          className="img-upload btn btn-bwm"
                          style={{ backgroundImage: 'url("/profile-placeholder.jpg")' }}
                        >
                          <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .gif"
                            defaultValue=""
                          />
                        </label>
                        {/* <h4>Change Your Profile Picture</h4> */}
                        <div className="img-preview-container">
                          <div
                            className="img-preview"
                            style={{
                              backgroundImage:
                                'url("http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png")'
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="form-submit">
                        <button className="btn button full" type="submit" disabled="">
                          Save New Picture
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Password</h2>
                    <form className="form my-form">
                      {/* <div className="form-group">
                        <div className="input-group">
                          <input
                            name="currentPassword"
                            placeholder="Old Password"
                            type="password"
                            className="form-control"
                            autoComplete="Old Password"
                            defaultValue=""
                          />
                          <span className="focus-input" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="password"
                            placeholder="New Password"
                            type="password"
                            className="form-control"
                            autoComplete="New Password"
                            defaultValue=""
                          />
                          <span className="focus-input" />
                        </div>
                      </div> */}
                      <div className="form-submit right">
                        <button className="btn button full" type="submit" disabled="">
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
