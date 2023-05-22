import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
	const navigate = useNavigate();

	useEffect(() => {}, [navigate]);

	return (
		<div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
			<h1 className="text-4xl font-bold mb-4">Nann-e</h1>
			<div className="flex space-x-4">
				<button onClick={() => navigate('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Login
				</button>
				<button onClick={() => navigate('/register')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
					Register
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
