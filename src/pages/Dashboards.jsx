import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ChatModal = ({ chats, closeModal }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-10">
			<div className="bg-white rounded-lg shadow-md p-6 w-96">
				<h2 className="text-lg font-semibold mb-4">Chats</h2>
				<div className="max-h-40 overflow-y-auto">
					{chats.map((chat, index) => (
						<div
							key={index}
							className={`flex p-2 rounded-lg ${chat.isUser === 'yes' ? 'justify-end' : 'justify-start'
								}`}
						>
							<div
								className={`p-2 rounded-lg ${chat.isUser === 'yes' ? 'bg-green-100' : 'bg-blue-100'
									}`}
							>
								<p className={`text-sm text-left ${chat.isUser === 'yes' ? 'text-right' : ''}`}>{chat.message}</p>
							</div>
						</div>
					))}
				</div>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
					onClick={closeModal}
				>
					Close
				</button>
			</div>
		</div>
	);
};

const Dashboards = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedChats, setSelectedChats] = useState([]);
	const [tableData, setTableData] = useState([]);

	// Sample data
	// const tableData = [
	// 	{
	// 		id: 1,
	// 		name: 'John',
	// 		age: 25,
	// 		nanne: 'Nanne A',
	// 		chats: [
	// 			{ message: 'Chat 1', isUser: 'yes' },
	// 			{ message: 'Chat 2', isUser: 'no' },
	// 			{ message: 'Chat 3', isUser: 'yes' }
	// 		]
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Jane',
	// 		age: 30,
	// 		nanne: 'Nanne B',
	// 		chats: [
	// 			{ message: 'Chat 4', isUser: 'no' },
	// 			{ message: 'Chat 5', isUser: 'yes' }
	// 		]
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Alice',
	// 		age: 35,
	// 		nanne: 'Nanne C',
	// 		chats: [{ message: 'Chat 6', isUser: 'no' }]
	// 	}
	// ];
	const search = useLocation().search
	const searchParams = new URLSearchParams(search)
	const param = searchParams.get('ref')

	useEffect(() => {
		fetchData(param);
	}, []);
	console.log(param)
	console.log(tableData)

	const fetchData = async (params) => {
		const body = { hash: params }
		try {
			const response = await axios.post('/api/dashboard', body);
			console.log(response.data)

			// const { Chat, ...data } = response.data;
			// const formattedData = {
			// 	id: data.id,
			// 	name: data.name,
			// 	age: data.age,
			// 	gender: data.gender,
			// 	nanne: data.nanne,
			// 	chats: Chat.map(({ Message, IsUser }) => ({
			// 		message: Message,
			// 		isUser: IsUser === 'yes' ? 'yes' : 'no',
			// 	})),
			// };
			setTableData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleShowModal = (id) => {
		const selectedData = tableData.find((data) => data.id === id);
		setSelectedChats(selectedData?.chats || []);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		// <div className="container mx-auto px-4 py-8">
		// 	<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
		// 	<table className="min-w-full bg-white border border-gray-200">
		// 		<thead>
		// 			<tr>
		// 				<th className="px-4 py-2 bg-gray-100 border-b">Name</th>
		// 				<th className="px-4 py-2 bg-gray-100 border-b">Age</th>
		// 				<th className="px-4 py-2 bg-gray-100 border-b">Nanne</th>
		// 				<th className="px-4 py-2 bg-gray-100 border-b">Actions</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// {tableData.map((data) => (
		// 	<tr key={data.id}>
		// 		<td className="px-4 py-2 border-b">{data.name}</td>
		// 		<td className="px-4 py-2 border-b">{data.age}</td>
		// 		<td className="px-4 py-2 border-b">{data.nanne}</td>
		// 		<td className="px-4 py-2 border-b">
		// 			<button
		// 				className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
		// 				onClick={() => handleShowModal(data.id)}
		// 			>
		// 				Show Chats
		// 			</button>
		// 		</td>
		// 	</tr>
		// ))}
		// 		</tbody>
		// 	</table>

		// 	{showModal && <ChatModal chats={selectedChats} closeModal={handleCloseModal} />}
		// </div>
		<>
			<div className="min-h-screen bg-[url('../src/assets/bgChat.svg')] flex flex-col justify-content-center align-items-center w-full sm:py-12">
				<div className="p-10 xs:p-0 w-full justify-content-center align-items-center mx-auto lg:w-3/4 md:w-3/5">

					<div className="bg-white shadow-lg w-full rounded-lg ">
						<h1 className='font-bold text-center text-gray-600 text-2xl p-5'>Dashboard Nann-E</h1>
						<div class="flex flex-col">
							<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
									<div class="overflow-hidden">
										<table class="min-w-full text-left text-sm font-light">
											<thead class="border-b font-medium dark:border-neutral-500">
												<tr>
													<th scope="col" class="px-6 py-4">Name</th>
													<th scope="col" class="px-6 py-4">Age</th>
													<th scope="col" class="px-6 py-4">Gender</th>
													<th scope="col" class="px-6 py-4">Nann-E</th>
												</tr>
											</thead>
											<tbody>

												{tableData.map((data) => (
													<tr
														class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
														<td class="whitespace-nowrap px-6 py-4 font-medium">{data.name}</td>
														<td class="whitespace-nowrap px-6 py-4">{data.age}</td>
														<td class="whitespace-nowrap px-6 py-4">{data.gender}</td>
														<td class="whitespace-nowrap px-6 py-4">{data.nanne}</td>
													</tr>
												))}

											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

export default Dashboards;
