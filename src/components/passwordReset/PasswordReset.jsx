import './passwordReset.scss'
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {

	const navigate = useNavigate()

    const host = import.meta.env.VITE_HOST;
    const [validUrl, setValidUrl] = useState(true);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `${host}/company/password/${param.id}/${param.token}`;

	const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
		const verifyUrl = async () => {
			try {
				setIsLoading(true);
				await axios.get(url);
				setValidUrl(true);
				setIsLoading(false);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const { data } = await axios.post(url, { Password: password });
			setMsg(data.message);
			setError("");
			// window.location = "/login";
			setIsLoading(false);
			navigate('/auth')
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
    <div className='resetPassword'>
      <Fragment>
			{validUrl ? (
				<div className="container">
					<form className='form_container' onSubmit={handleSubmit}>
						<h1>Add New Password</h1>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className='input'
						/>
						{error && <div className='error_msg'>{error}</div>}
						{msg && <div className='success_msg'>{msg}</div>}
						<button type="submit" className='green_btn'>
							Submit
						</button>
					</form>
				</div>
			) : (
				<h1 className='notFound' >404 Not Found</h1>
			)}
		</Fragment>
    </div>
  )
}

export default PasswordReset
