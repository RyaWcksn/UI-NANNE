import React, { useEffect, useState } from 'react'
import Albert from '../assets/pngwing.com.png'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
		<div className='flex justify-center items-center h-screen'>
			<div className="bg-white rounded-lg shadow-md p-4 w-96">
				<div className="flex flex-col">
					<h1>Welcome to Nann-e!</h1>
					<div className="">
						<h2>please enter your Name, Age and your Gender to let Nann-e know who you are!</h2>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Name</label>
					<input
						type="text"
						id="name"
						className="border border-gray-400 p-2 w-full rounded-lg"
						value={name}
						onChange={HandleNameChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="text" className="block text-gray-700 font-bold mb-2">Age</label>
					<input
						type="text"
						id="age"
						className="border border-gray-400 p-2 w-full rounded-lg"
						value={age}
						onChange={HandleAgeChange}
					/>
				</div>
				<div className="mb-4">
					<div className="mb-4">
						<label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
							Gender
						</label>
						<select
							id="gender"
							className="border border-gray-400 p-2 w-full rounded-lg"
							value={gender}
							onChange={HandleGenderChange}
						>
							<option value="">Select gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>			</div>
				<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
					onClick={handleNext}> Next
				</button>
			</div>
		</div>
	);
}

const NannePicker = ({ formData }) => {
	const navigate = useNavigate();

	const data = [
		{
			id: 1,
			name: "Alber",
			image: Albert,
			description: "Creative AI focusing on intuition, emotions, and artistic expression.",
		},
		{
			id: 2,
			name: "Keita",
			image: Albert,
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
			.then(function(response) {
				console.log(response);
				localStorage.setItem("id", response.data.id)
				localStorage.setItem("name", response.data.name)
			})
			.catch(function(error) {
				console.log(error);
			});
		setTimeout(() => {
			navigate('/chat');
		}, 500); // Adjust the delay as needed
	}
	return (
		<div className='flex flex-col justify-center items-center h-screen p-4'>
			<div className="bg-white rounded-lg ">
				<h2>Now pick your Nann-e and begin the journey!</h2>
			</div>
			<div className="gap-4 grid grid-cols-2 sm:grid-cols-2 w-96">
				{data.map((e, i) => (
					<div key={i} className="bg-white rounded-lg shadow-md p-4 border-4 border-indigo-200">
						<h1>{e.name}</h1>
						<img src={e.image} alt={e.name} />
						<h2>{e.description}</h2>
						<button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
							onClick={() => onClickHandler(e.id, e.image)}
					>
							{e.name}
						</button>
					</div>
				))}
			</div>
		</div>
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
