import { useRef, useState } from "react";
import "./auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const Auth = () => {
  const authToggler = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const formButton = useRef();

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
    try {
      const response = await axios.post(
        `${host}/auth/company/register`,
        registerFormValues
      );
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to register",
      });
    }
    setAlert({
      type: "success",
      message: "Thank You for registering",
    });
    setTimeout(navigate(0), 1000);
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
      setAlert({
        type: "success",
        message: "Login Successful",
      });
      dispatch(loginSuccess(res.data));
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to Login",
      });
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
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}
          {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
          {/* <Alert severity="success">
     This is a success alert — check it out!
     </Alert> */}
          <section className="auth">
            <div className="container" ref={authToggler}>
              <div className="user signinBx">
                <div className="imgBx">
                  <img
                    src="/auth2.jpg"
                    alt=""
                    style={{
                      objectFit: "cover",
                      borderRight: "1px solid grey",
                    }}
                  />
                </div>
                <div className="formBx">
                  <form>
                    <h2>Sign In</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginFormValues.Email}
                      onChange={(e) =>
                        setLoginFormValues({
                          ...loginFormValues,
                          Email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginFormValues.Password}
                      onChange={(e) =>
                        setLoginFormValues({
                          ...loginFormValues,
                          Password: e.target.value,
                        })
                      }
                    />
                    <p style={{ margin: "10px" }}>
                      <Link to="/forgot-password">Forgot password ?</Link>
                    </p>
                    <input
                      type="submit"
                      onClick={handleLogin}
                      name=""
                      defaultValue="Login"
                    />
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
                    <p className="signup">
                      Don't have an account ? &nbsp;
                      <a
                        href="#"
                        onClick={() =>
                          authToggler.current.classList.toggle("active")
                        }
                      >
                        Sign Up.
                      </a>
                    </p>
                  </form>
                </div>
              </div>
              <div className="user signupBx">
                <div className="formBx">
                  <form>
                    <h2>Create an account</h2>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Your Company Name"
                      value={registerFormValues.CompanyName}
                      onChange={(e) =>
                        setRegisterFormValues({
                          ...registerFormValues,
                          CompanyName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={registerFormValues.Name}
                      onChange={(e) =>
                        setRegisterFormValues({
                          ...registerFormValues,
                          Name: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      name="designation"
                      placeholder="Your Designations"
                      value={registerFormValues.Designation}
                      onChange={(e) =>
                        setRegisterFormValues({
                          ...registerFormValues,
                          Designation: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter Your Email"
                      value={registerFormValues.Email}
                      onChange={(e) =>
                        setRegisterFormValues({
                          ...registerFormValues,
                          Email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Create Password"
                      value={registerFormValues.Password}
                      onChange={(e) =>
                        setRegisterFormValues({
                          ...registerFormValues,
                          Password: e.target.value,
                        })
                      }
                    />
                    {/* <input type="password" name="" placeholder="Confirm Password" /> */}
                    <input
                      type="submit"
                      name=""
                      onClick={handleRegister}
                      defaultValue="Sign Up"
                    />
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
                    <p className="signup">
                      Already have an account ? &nbsp;
                      <a
                        href="#"
                        onClick={() =>
                          authToggler.current.classList.toggle("active")
                        }
                      >
                        Sign in.
                      </a>
                    </p>
                  </form>
                </div>
                <div className="imgBx">
                  <img
                    src="/auth1.jpg"
                    alt=""
                    style={{ objectFit: "cover", borderLeft: "1px solid grey" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Auth;
