import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		password: "",
		phoneNumber: "",
		email: "",
	});

	const { name, password, phoneNumber, email } = formData;
	const header = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios.post("/api/v1/auth/user/register", formData, header).
			catch(err => {
				setErrorMessage(err.response.data.error);
			}).
			then((response) => {
				console.log(response.data.loginToken);
				console.log(response.data.expiryDate);
				// localStorage.setItem('token', response.data.loginToken);
				// localStorage.setItem('expiryDate', response.data.expiryDate);
				navigate('/');
			});
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl mb-4">Register</h1>
				{errorMessage && (
					<div className="bg-red-100 text-red-500 p-2 rounded-lg mb-4">{errorMessage}</div>
				)}
				<div className="mb-4">
					<label htmlFor="name" className="block mb-1">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						className="w-full border border-gray-400 p-2 rounded"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block mb-1">
						Password
					</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						className="w-full border border-gray-400 p-2 rounded"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="phoneNumber" className="block mb-1">
						Phone Number
					</label>
					<input
						type="text"
						name="phoneNumber"
						value={phoneNumber}
						onChange={handleChange}
						className="w-full border border-gray-400 p-2 rounded"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="email" className="block mb-1">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
						className="w-full border border-gray-400 p-2 rounded"
					/>
				</div>

				<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
