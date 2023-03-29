import "./forgotPassword.scss";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const host = import.meta.env.VITE_HOST;

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${host}/company/password`;
			const { data } = await axios.post(url, { Email: email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

  return (
    <div className="forgotPassword">
      <div className="container">
        <form className="form_container" onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="input"
          />
          {error && <div className="error_msg">{error}</div>}
          {msg && <div className="success_msg">{msg}</div>}
          <button type="submit" className="green_btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
