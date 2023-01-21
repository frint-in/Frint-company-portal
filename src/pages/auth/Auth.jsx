import React from "react";
import { useRef, useState, useEffect } from "react";
import "./auth.scss";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import {auth, provider} from '../../firebase'
import { signInWithPopup } from'firebase/auth'


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;
  

  const formButton = useRef();

  const onSignUpButtonClick = () => {
    formButton.current.classList.remove("bounceRight");
    formButton.current.classList.add("bounceLeft");
  };

  const onLoginButtonClick = () => {
    formButton.current.classList.remove("bounceLeft");
    formButton.current.classList.add("bounceRight");
  };

  // Handle Registration Process

  const initialValues = {
    CompanyName: "",
    Name: "",
    Designation: "",
    CompanyType: "",
    Email: "",
    WorkEmail: "",
    PhoneNumber: "",
    WhatsappNumber: "",
    Address: "",
    Password: "",
  };
  const [registerFormValues, setRegisterFormValues] = useState(initialValues);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try{
      const response = await axios.post(`${host}/auth/company/register`, registerFormValues)
      dispatch(loginSuccess(res.data))
    }catch(error){
      dispatch(loginFailure());
    }
    // response && navigate(0)
  };

  // Handle Login In Functions

  const [loginFormValues, setLoginFormValues] = useState({
    Email: "",
    Password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${host}/auth/company/login`, {
        ...loginFormValues,
      });
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  // ============= Auth =============

  const google = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(`${host}/auth/company/google/auth`, {
            Name: result.user.displayName,
            Email: result.user.email,
            profilePic: result.user.photoURL,
          })
          .then((res) => {
            // console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <>
      {/* <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <div className="auth">
        <section className="user">
          <div className="user_options-container">
            <div className="user_options-text">
              <div className="user_options-unregistered">
                <h2 className="user_unregistered-title">
                  Don't have an account?
                </h2>
                <p className="user_unregistered-text">
                  So, what are you waiting for? Hurry, register at Frint now and
                  acquire the best Interens with only a few clicks.{" "}
                </p>
                <button
                  className="user_unregistered-signup"
                  id="signup-button"
                  onClick={onSignUpButtonClick}
                >
                  Sign up
                </button>
              </div>
              <div className="user_options-registered">
                <h2 className="user_registered-title">
                  Already have an account?
                </h2>
                <p className="user_registered-text">
                  Log in today and begin recruiting immediately.
                </p>
                <button
                  className="user_registered-login"
                  onClick={onLoginButtonClick}
                  id="login-button"
                >
                  Login
                </button>
              </div>
            </div>
            <div
              className="user_options-forms"
              ref={formButton}
              id="user_options-forms"
            >
              {/* -------------------Login Form ------------------- */}
              <div className="user_forms-login">
                <h2 className="forms_title">Login</h2>

                <form className="forms_form" onSubmit={handleLogin}>
                  <fieldset className="forms_fieldset">
                    <div className="forms_field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="forms_field-input"
                        value={loginFormValues.Email}
                        onChange={(e) =>
                          setLoginFormValues({
                            ...loginFormValues,
                            Email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="forms_field-input"
                        value={loginFormValues.Password}
                        onChange={(e) =>
                          setLoginFormValues({
                            ...loginFormValues,
                            Password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </fieldset>
                  <p
                    style={{
                      textAlign: "center",
                      paddingTop: 10,
                      fontSize: "1.2em",
                    }}
                  >
                    Or
                  </p>
                  <button
                    type="button"
                    onClick={google}
                    className="google-login social-login"
                  >
                    Login With Google <Google />
                  </button>
                  {/* <button
                    type="button"
                    onClick={github}
                    className="github-login social-login"
                  >
                    Login With GitHub <GitHub />
                  </button>
                  <button
                    type="button"
                    onClick={facebook}
                    className="facebook-login social-login"
                  >
                    Login With Facebook <Facebook />
                  </button> */}
                  <div className="forms_buttons">
                    <button type="button" className="forms_buttons-forgot">
                      Forgot password?
                    </button>
                    <input
                      type="submit"
                      defaultValue="Log In"
                      className="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
              {/* -------------------------Register -------------------- */}
              <div className="user_forms-signup">
                <h2 className="forms_title">Sign Up</h2>
                <form className="forms_form" onSubmit={handleRegister}>
                  <fieldset className="forms_fieldset">
                    <div className="forms_field">
                      <input
                        type="text"
                        name="comapnyname"
                        placeholder="Company Name"
                        className="forms_field-input"
                        value={registerFormValues.CompanyName}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            CompanyName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="forms_field-input"
                        value={registerFormValues.Name}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            Name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="text"
                        name="designation"
                        placeholder="Your Designations"
                        className="forms_field-input"
                        value={registerFormValues.Designation}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            Designation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="email"
                        name="Email"
                        placeholder="Enter Your Email"
                        className="forms_field-input"
                        value={registerFormValues.Email}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            Email: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* <div className="forms_field">
                      <input
                        type="email"
                        name="workEmail"
                        placeholder="Enter your work email"
                        className="forms_field-input"
                        value={registerFormValues.WorkEmail}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            WorkEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter Your Phone Number"
                        className="forms_field-input"
                        value={registerFormValues.PhoneNumber}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            PhoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter Your Whatsapp Number"
                        className="forms_field-input"
                        value={registerFormValues.WhatsappNumber}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            WhatsappNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="forms_field">
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter Address of Your Company"
                        className="forms_field-input"
                        value={registerFormValues.Address}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            Address: e.target.value,
                          })
                        }
                      />
                    </div> */}

                    <div className="forms_field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="forms_field-input"
                        value={registerFormValues.Password}
                        onChange={(e) =>
                          setRegisterFormValues({
                            ...registerFormValues,
                            Password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </fieldset>
                  <p
                    style={{
                      textAlign: "center",
                      paddingTop: 10,
                      fontSize: "1.2em",
                    }}
                  >
                    Or
                  </p>
                  <button
                    type="button"
                    onClick={google}
                    className="google-login social-login"
                  >
                    Sign-Up With Google <Google />
                  </button>
                  {/* <button
                    type="button"
                    onClick={github}
                    className="github-login social-login"
                  >
                    Sign-Up With GitHub <GitHub />
                  </button>
                  <button
                    type="button"
                    onClick={facebook}
                    className="facebook-login social-login"
                  >
                    Sign-Up With Facebook <Facebook />
                  </button> */}
                  <div className="forms_buttons">
                    <input
                      type="submit"
                      defaultValue="Sign up"
                      className="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Auth;
