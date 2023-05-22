import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
	const [data, setData] = useState([]);

	const header = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	};

	const search = useLocation().search
	const searchParams = new URLSearchParams(search)
	const param = searchParams.get('ref')

	useEffect(() => {
		fetchData(param);
	}, []);

	const fetchData = async (params) => {
		const body = { hash: params }
		try {
			const response = await axios.post('/api/dashboard', body, header);
			console.log(response.data)
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Dashboard</h2>
			<table className="min-w-full bg-white border border-gray-300">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">Name</th>
						<th className="py-2 px-4 border-b">Role</th>
						<th className="py-2 px-4 border-b">Age</th>
						<th className="py-2 px-4 border-b">Chat</th>
					</tr>
				</thead>
				<tbody className=''>
					<tr>
						<td className="py-2 px-4 border-b">{data.Name}</td>
						<td className="py-2 px-4 border-b">{data.Role}</td>
						<td className="py-2 px-4 border-b">{data.Age} Years old</td>
						<td className="py-2 px-4 border-b">""</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;

