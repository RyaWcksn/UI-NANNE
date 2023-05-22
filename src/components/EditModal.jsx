import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditChildModal({ closeModal, prevData }) {
	console.log(prevData);
	const [isOpen, setIsOpen] = useState(true);
	const [age, setAge] = useState(0);
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');
	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleInputChange = (e) => {
	};
	const body = {
		"age": parseInt(age),
		"roleName": selectedOption,
	};
	const header = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	};
	const url = '/api/v1/child/' + prevData.childName;

	const handleSubmit = (e) => {
		if (selectedOption == "") {
			setSelectedOption(prevData.roleName);
		}
		if (age == null) {
			setAge(prevData.age);
		}
		e.preventDefault();
		axios.patch(url, body, header).catch(err => {
			alert(err.response.data.error);
		}).then((response) => {
			console.log(response.data);
			console.log(response.data);
		});
		handleClose();
		window.location.reload(true);
	};

	useEffect(() => {
		axios.get('/api/v1/roles?page=1&limit=5', header).
			catch(err => {
				alert(err.response.data.error);
			}).
			then((response) => {
				setOptions(response.data.data);
			});
	}, []);



	const handleClose = () => {
		setIsOpen(false);
		closeModal(); // Call the closeModal function from the parent component
	};

	console.log(options);

	return (
		<div>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen">
						<div className="fixed inset-0 bg-gray-900 opacity-50" onClick={handleClose} />

						<div className="relative bg-white rounded-lg w-1/2">
							{/* Header */}
							<div className="p-4 border-b">
								<h1 className="text-xl font-semibold">Update {prevData.childName} data</h1>
								<button className="absolute top-0 right-0 p-2" onClick={handleClose}>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* Body */}
							<div className="p-4">
								<form onSubmit={handleSubmit}>
									<div className="p-4">
										<div className="mb-4 flex items-center">
											<label htmlFor="name" className="block text-gray-700 font-semibold w-24 pr-4">
												Age
											</label>
											<input
												type="tel"
												name="age"
												onChange={handleInputChange}
												className="border-gray-400 border rounded-md py-2 px-3 w-full"
												placeholder={prevData.age}
											/>
										</div>
										<div className="mb-4 flex items-center">
											<label htmlFor="name" className="block text-gray-700 font-semibold w-24 pr-4">
												Role
											</label>
											<select
												id="dropdown"
												name="dropdown"
												value={selectedOption}
												onChange={handleSelectChange}
												className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
											>
												<option value="">Select an option</option>
												{options.length > 0 && options.map(option => (
													<option key={option.roleName} value={option.roleName}>{option.roleName}</option>
												))}
											</select>
										</div>
										<div className="text-right">
											<button
												type="submit"
												className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
											>
												Submit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default EditChildModal;
