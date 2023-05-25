import React, { useEffect, useState } from 'react'
import Albert from '../assets/albert.png'
import galadriel from '../assets/galadriel.png'
import albertBot from '../assets/Albert-bot.png'
import elfBot from '../assets/Elf-bot.png'
import { Navigate, useNavigate } from 'react-router-dom';
import CheckLogin from '../functions/PublicFunction';
import axios from 'axios';

const InputIdentity = ({ onNext }) => {


	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');

	const HandleNameChange = (e) => {
		setName(e.target.value)
	}

	const HandleAgeChange = (e) => {
		setAge(e.target.value)
	}

	const HandleGenderChange = (e) => {
		setGender(e.target.value)
	}

	const handleNext = () => {
		onNext({ name, age, gender });
	};

	return (
		// <div className='flex justify-center items-center h-screen'>
		// 	<div className="bg-white rounded-lg shadow-md p-4 w-96">
		// 		<div className="flex flex-col">
		// 			<h1>Welcome to Nann-e!</h1>
		// 			<div className="">
		// 				<h2>please enter your Name, Age and your Gender to let Nann-e know who you are!</h2>
		// 			</div>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Name</label>
		// 			<input
		// 				type="text"
		// 				id="name"
		// 				className="border border-gray-400 p-2 w-full rounded-lg"
		// 				value={name}
		// 				onChange={HandleNameChange}
		// 			/>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Age</label>
		// 			<input
		// 				type="text"
		// 				id="age"
		// 				className="border border-gray-400 p-2 w-full rounded-lg"
		// 				value={age}
		// 				onChange={HandleAgeChange}
		// 			/>
		// 		</div>
		// 		<div className="mb-4">
		// 			<div className="mb-4">
		// 				<label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
		// 					Gender
		// 				</label>
		// 				<select
		// 					id="gender"
		// 					className="border border-gray-400 p-2 w-full rounded-lg"
		// 					value={gender}
		// 					onChange={HandleGenderChange}
		// 				>
		// 					<option value="">Select gender</option>
		// 					<option value="male">Male</option>
		// 					<option value="female">Female</option>
		// 				</select>
		// 			</div>			</div>
		// 		<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
		// 			onClick={handleNext}> Next
		// 		</button>
		// 	</div>
		// </div>
		<>
			<div className="min-h-screen bg-[url('../src/assets/bgChat.svg')] flex flex-col justify-content-center align-items-center w-full sm:py-12">
				<div className="p-10 xs:p-0 w-full justify-content-center align-items-center mx-auto lg:w-1/3 md:w-3/5">

					<div className="bg-white shadow-lg w-full rounded-lg ">

						<div className='w-full flex items-center justify-center pt-5'><img width={200} src="../src/assets/robotLogin.png" /></div>
						<div className='divide-y'>
							<h1 className="font-bold text-center text-gray-600 text-2xl pb-5">Welcome to Nann-e!</h1>

							<div className="px-5 py-7">
								<label className="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
								<input type="text" value={name}
									onChange={HandleNameChange} id='name' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-gray-400" />

								<label className="font-semibold text-sm text-gray-600 pb-1 block">Age</label>
								<input type="number" value={age}
									onChange={HandleAgeChange} id='age' min={1} className="border rounded-lg px-3 py-2 mt-1 mb-5 focus:outline-gray-400 text-sm w-full appearance-none" />

								<label className="font-semibold text-sm text-gray-600 pb-1 block">Gender</label>
								<select
									id="gender"
									className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full appearance-none focus:outline-gray-400"
									value={gender}
									onChange={HandleGenderChange}
								>
									<option value="">Select gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>

								<button type="button" onClick={handleNext} className="transition duration-200 bg-gray-700 hover:bg-gray-900 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
									<span className="inline-block mr-2">Start Chat</span>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</button>
							</div>
						</div>

					</div>

				</div>
			</div>
		</>
	);
}

const NannePicker = ({ formData }) => {
	const navigate = useNavigate();

	const data = [
		{
			id: 1,
			name: "Albert",
			image: albertBot,
			description: "Creative AI focusing on intuition, emotions, and artistic expression.",
		},
		{
			id: 2,
			name: "Galadriel",
			image: elfBot,
			description: "Logic-driven AI with precision and problem-solving capabilities.",
		},
	]


	const { name, age, gender } = formData;
	const [nanneId, setNanneId] = useState(0);
	const [showChat, setShowChat] = useState(false);

	const settings = {
		Infinity: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: false, // Disable vertical scrolling
	};

	const onClickHandler = (id, img) => {
		setNanneId(id);
		localStorage.setItem("nanne", img)
		const bodyRequest = {
			name: name,
			age: age,
			gender: gender,
			nanneId: Number(id)
		}
		console.log(bodyRequest)
		axios.post('/api/register',
			bodyRequest,
		)
			.then(function (response) {
				console.log(response);
				localStorage.setItem("id", response.data.id)
				localStorage.setItem("name", response.data.name)
			})
			.catch(function (error) {
				console.log(error);
			});
		setTimeout(() => {
			navigate('/chat');
		}, 500); // Adjust the delay as needed
	}
	return (
		// <div className='flex flex-col justify-center items-center h-screen p-4'>
		// 	<div className="bg-white rounded-lg ">
		// 		<h2>Now pick your Nann-e and begin the journey!</h2>
		// 	</div>
		// 	<div className="gap-4 grid grid-cols-2 sm:grid-cols-2 w-96">
		// {data.map((e, i) => (
		// <div key={i} className="bg-white rounded-lg shadow-md p-4 border-4 border-indigo-200">
		// 	<h1>{e.name}</h1>
		// 	<img src={e.image} alt={e.name} />
		// 	<h2>{e.description}</h2>
		// 	<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
		// 		onClick={() => onClickHandler(e.id, e.image)}
		// 	>
		// 		{e.name}
		// 	</button>
		// </div>
		// ))}
		// 	</div>
		// </div>
		<>
			<div className="min-h-screen bg-[url('../src/assets/bgChat.svg')] w-full flex flex-col sm:py-12">
				<div className="p-8 xs:p-1 mx-auto justify-content-center align-items-center">
					<h1 className="font-bold text-center text-gray-600 text-2xl pb-7">Which one you like?</h1>
					<div className="gap-10 grid grid-cols-1  mx-auto justify-content-center align-items-center md:grid-cols-2 w-[80%] md:w-[80%] lg:w-[50%]">
						{data.map((e, i) => (
							<div key={i} className="bg-white rounded-lg shadow-md p-4">

								<img src={e.image} alt={e.name} className="m-0 p-0 rounded-lg" />
								<h2 className='text-center mt-5'>{e.description}</h2>
								<button className="mt-4 transition duration-200 bg-gray-700 hover:bg-gray-900 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
									onClick={() => onClickHandler(e.id, e.image)}
								>
									{e.name}
								</button>
							</div>
						))}
					</div>

				</div>

			</div>
		</>
	);
}
const Index = () => {
	const validation = CheckLogin()
	const navigate = useNavigate()
	useEffect(() => {
		if (validation) {
			navigate('/chat')
			return
		}
	});
	const [cardNumber, setCardNumber] = useState(1);
	const [formData, setFormData] = useState({});

	const handleNextCard = (data) => {
		setFormData(data);
		setCardNumber((prevCardNumber) => prevCardNumber + 1);
	};

	const renderCard = () => {
		switch (cardNumber) {
			case 1:
				return <InputIdentity onNext={handleNextCard} />;
			case 2:
				return <NannePicker formData={formData} />;
			default:
				return null;
		}
	};

	return (
		<div className="fade-container">
			{renderCard()}
			<style jsx>{`
        .fade-container > div {
          animation: fadeIn 0.5s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}
			</style>

		</div>

	);
}

export default Index;
