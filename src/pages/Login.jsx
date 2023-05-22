import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckLogin from '../functions/PublicFunction';


function LoginPage() {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [age, setAge] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const isLogin = CheckLogin();
		if (isLogin) {
			navigate('/chat');
			return;
		}
	}, [navigate]);


	const handleEmailChange = (event) => {
		setName(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setRole(event.target.value);
	};

	const handleAgeChange = (event) => {
		setAge(event.target.value);
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		axios.post('/api/register', {
			name: name,
			role: role,
			age: age,
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}
		).catch(err => {
			setErrorMessage(err.response.data.error);
		}).then((response) => {
			console.log(response.data.id);
			console.log(response.data);
			localStorage.setItem('id', response.data.id);
			localStorage.setItem('name', response.data.name);
			navigate('/chat');
		});
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-blue-100">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
				{errorMessage && (
					<div className="bg-red-100 text-red-500 p-2 rounded-lg mb-4">{errorMessage}</div>
				)}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Name</label>
						<input
							type="text"
							id="name"
							className="border border-gray-400 p-2 w-full rounded-lg"
							value={name}
							onChange={handleEmailChange}
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Role</label>
						<input
							type="text"
							id="role"
							className="border border-gray-400 p-2 w-full rounded-lg"
							value={role}
							onChange={handlePasswordChange}
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Age</label>
						<input
							type="text"
							id="age"
							className="border border-gray-400 p-2 w-full rounded-lg"
							value={age}
							onChange={handleAgeChange}
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
