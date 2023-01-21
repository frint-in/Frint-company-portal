import React from "react";
import { useRef, useState, useEffect } from "react";
import AddInternship from "../../components/addInternship/AddInternship";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./editSettings.scss";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Alert from "@mui/material/Alert";

const EditSettings = () => {
  const dispatch = useDispatch();
  const host = import.meta.env.VITE_HOST;
  const { currentUser } = useSelector((state) => state.user);

  const [picUploadPercentage, SetpicUploadPercentage] = useState(0);

  useEffect(() => {
    setFormValues({
      CompanyName: currentUser ? currentUser.CompanyName : "",
      Name: currentUser ? currentUser.Name : "",
      Designation: currentUser ? currentUser.Designation : "",
      CompanyType: currentUser ? currentUser.CompanyType : "",
      Email: currentUser ? currentUser.Email : "",
      WorkEmail: currentUser ? currentUser.WorkEmail : "",
      PhoneNumber: currentUser ? currentUser.PhoneNumber : "",
      WhatsappNumber: currentUser ? currentUser.WhatsappNumber : "",
      Address: currentUser ? currentUser.Address : "",
      Password: currentUser ? currentUser.Password : "",
      profilePic: currentUser ? currentUser.profilePic : "",
      companyLogo: currentUser ? currentUser.companyLogo : "",
    });
  }, [currentUser]);

  const [formValues, setFormValues] = useState({});

  const handleUpdate = async () => {
    dispatch(updateStart);
    try {
      const updatedUser = await axios.put(
        `${host}/company/update/${currentUser._id}`,
        { ...formValues }
      );
      console.log(updatedUser);
    } catch (error) {
      dispatch(updateFailure);
    }
  };

  const uploadFile = (file, imgType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        SetpicUploadPercentage(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormValues((prev) => {
            return { ...prev, [imgType]: downloadURL };
          });
        });
      }
    );
  };

  //   ProfilePic Upload

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  // xxxxxxxxxxxxxx  ProfilePic Upload xxxxxxx

  //   Company Logo Upload
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState();
  const [companyLogoPreview, setCompanyLogoPreview] = useState("");

  useEffect(() => {
    if (!selectedCompanyLogo) {
      setCompanyLogoPreview(undefined);
      return;
    }
    const previewUrl = URL.createObjectURL(selectedCompanyLogo);
    setCompanyLogoPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedCompanyLogo]);

  const handleCompanyLogoUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedCompanyLogo(undefined);
      return;
    }
    setSelectedCompanyLogo(e.target.files[0]);
  };

  // xxxxxxxxxxxxxx  Company Logo Upload xxxxxxxxxx

  useEffect(() => {
    selectedFile && uploadFile(selectedFile, "profilePic");
    if (picUploadPercentage === 100) {
      SetpicUploadPercentage(0);
    }
  }, [selectedFile]);

  useEffect(() => {
    selectedCompanyLogo && uploadFile(selectedCompanyLogo, "companyLogo");
    if (picUploadPercentage === 100) {
      SetpicUploadPercentage(0);
    }
  }, [selectedCompanyLogo]);

  return (
    <>
      {/* <Alert severity="error" style={{position: 'sticky', top: 0 }} >This is an error alert — check it out!</Alert> */}
      {picUploadPercentage !== 0 && picUploadPercentage !== 100 && (
        <Alert severity="success" style={{ position: "sticky", top: 0 }}>
          Picture is being uploaded - {picUploadPercentage} % done
        </Alert>
      )}
      <AddInternship />
      <div className="editSettings">
        <div className="app-container">
          <Navbar />
          <div className="app-content">
            <Sidebar />

            <div className="projects-section">
              <div className="settings-page">
                <div className="settings-container">
                  <div className="page-title">
                    <h1>Edit Account Details</h1>
                    <div className="button-heading">
                      <Button
                        variant="contained"
                        type="edit"
                        className="sendForm left"
                        color="error"
                        style={{ margin: 10 }}
                      >
                        <ClearIcon />
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        type="edit"
                        className="sendForm left"
                        style={{ margin: 10 }}
                        onClick={handleUpdate}
                      >
                        <DoneIcon />
                        Done
                      </Button>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h2 className="settings-title">General Information</h2>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">Company Name :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.CompanyName}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              CompanyName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">Name :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.Name}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              Name: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">Designation :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.Designation}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              Designation: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">Company Type :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.CompanyType}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              CompanyType: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Contact Details</h2>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">Email :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.Email}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              Email: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">WorkEmail :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.WorkEmail}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              WorkEmail: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">PhoneNumber :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.PhoneNumber}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              PhoneNumber: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                    <div className="non-active-form">
                      {/* <p> */}
                      <div className="fieldName">WhatsappNumber :</div>
                      <div className="fieldValue">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={formValues && formValues.WhatsappNumber}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              WhatsappNumber: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* </p> */}
                    </div>
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Profile Picture</h2>
                    <form className="form my-form formCenterContainer">
                      <div className="container">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input
                              type="file"
                              id="imageUpload"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleFileUpload}
                            />
                            <label htmlFor="imageUpload">
                              {" "}
                              <Edit />{" "}
                            </label>
                          </div>
                          <div className="avatar-preview">
                            <div
                              id="imagePreview"
                              style={{
                                backgroundImage: `url(${
                                  preview
                                    ? preview
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                })`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="form-submit">
                        {/* <Button
                          variant="outlined"
                          // color="success"
                          type="edit"
                          className="picButton"
                          onClick={handleProfilePicUpload}
                        >
                          <Edit />
                          Add New Profile Picture
                        </Button> */}
                      </div>
                    </form>
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Company Logo</h2>
                    <form className="form my-form formCenterContainer">
                      <div className="container">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input
                              type="file"
                              id="companyLogoUpload"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleCompanyLogoUpload}
                            />
                            <label htmlFor="companyLogoUpload">
                              {" "}
                              <Edit />{" "}
                            </label>
                          </div>
                          <div className="avatar-preview">
                            <div
                              id="imagePreview"
                              style={{
                                backgroundImage: `url(${
                                  companyLogoPreview
                                    ? companyLogoPreview
                                    : "https://cdn.pixabay.com/photo/2021/10/11/23/49/building-6702046_960_720.png"
                                })`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="form-submit">
                        {/* <Button
                          variant="outlined"
                          // color="success"
                          type="edit"
                          className="picButton"
                        >
                          <Edit />
                          Add Company Logo
                        </Button> */}
                      </div>
                    </form>
                  </div>
                  <div className="settings-section">
                    <h2 className="settings-title">Password</h2>
                    <form className="form my-form formCenterContainer">
                      <TextField
                        id="filled-password-input"
                        label="New password"
                        type="password"
                        autoComplete="text-password"
                        variant="filled"
                        style={{ margin: 10 }}
                      />
                      <TextField
                        id="filled-password-input"
                        label="Re-Enter password"
                        type="password"
                        autoComplete="text-password"
                        variant="filled"
                        style={{ margin: 10 }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSettings;
