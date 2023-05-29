import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// const ChatModal = ({ chats, closeModal }) => {
// 	return (
// 		<div className="fixed inset-0 flex items-center justify-center z-10">
// 			<div className="bg-white rounded-lg shadow-md p-6 w-96">
// 				<h2 className="text-lg font-semibold mb-4">Chats</h2>
// 				<div className="max-h-40 overflow-y-auto">
// 					{chats.map((chat, index) => (
// 						<div
// 							key={index}
// 							className={`flex p-2 rounded-lg ${chat.isUser === 'yes' ? 'justify-end' : 'justify-start'
// 								}`}
// 						>
// 							<div
// 								className={`p-2 rounded-lg ${chat.isUser === 'yes' ? 'bg-green-100' : 'bg-blue-100'
// 									}`}
// 							>
// 								<p className={`text-sm text-left ${chat.isUser === 'yes' ? 'text-right' : ''}`}>{chat.message}</p>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 				<button
// 					className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
// 					onClick={closeModal}
// 				>
// 					Close
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

const Dashboards = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedChats, setSelectedChats] = useState([]);

	const search = useLocation().search
	const searchParams = new URLSearchParams(search)
	const param = searchParams.get('ref')

	const [tableData, setTableData] = useState('');

	useEffect(() => {
		console.log("Masuk sini ga nih")
		const fetchData = async () => {
			console.log("Masuk sini ga")
			const page = 1
			const limit = 10
			const Url = `/api/dashboard?hash=${param}&limit=${limit}&page=${page}`
			try {
				const response = await axios.get(Url);
				console.log("Response from BE ", response.data)
				setTableData(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		if (tableData == '') {
			fetchData()
		}
	}, [tableData]);


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
						<div className="flex flex-col">
							<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
									<div className="overflow-hidden">
										<table className="min-w-full text-left text-sm font-light">
											<thead className="border-b font-medium dark:border-neutral-500">
												<tr>
													<th scope="col" className="px-6 py-4">Name</th>
													<th scope="col" className="px-6 py-4">Age</th>
													<th scope="col" className="px-6 py-4">Gender</th>
													<th scope="col" className="px-6 py-4">Nann-E</th>
												</tr>
											</thead>
											<tbody>

												<tr
													className="border-b transition duration-299 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
													<td className="whitespace-nowrap px-6 py-4 font-medium">{tableData.Name}</td>
													<td className="whitespace-nowrap px-6 py-4">{tableData.Age}</td>
													<td className="whitespace-nowrap px-6 py-4">{tableData.Gender}</td>
													<td className="whitespace-nowrap px-6 py-4">{tableData.Nanne}</td>
												</tr>

											</tbody>
										</table>

									</div>
								</div>
							</div>

						</div>

					</div>

					<div className="flex inset-0 items-top justify-center mt-10 gap-4 flex-wrap">
						{tableData.git  && tableData.Sessions.map((session) => (
							<div key={session.id} className='basis-1/4 py-2 sm:px-6 lg:px-1 sm:mx-6 px-6'>
								<div className="bg-white rounded-lg shadow-md p-6 w-96 ">
									<h2 className="text-lg font-semibold mb-4">{new Date(session.createdAt).toLocaleString('en-US', {
										dateStyle: 'medium',
										timeStyle: 'short'
									})}</h2>
									<div className="max-h-40 overflow-y-auto">
										<div className="max-h-40 overflow-y-auto">
											{session.chats !== null && session.chats.length > 0 ? (
												session.chats.map((chat) => (
													<div
														key={chat.id}
														className={`flex p-2 rounded-lg ${chat.isUser === 'yes' ? 'justify-end' : 'justify-start'
															}`}
													>
														<div
															className={`p-2 rounded-lg ${chat.isUser === 'yes' ? 'bg-green-100' : 'bg-blue-100'
																}`}
														>
															<p className={`text-sm text-left ${chat.isUser === 'yes' ? 'text-right' : ''}`}>
																{chat.message}
															</p>
														</div>
													</div>
												))
											) : (
												<p>No chats available.</p>
											)}
										</div>

									</div>
								</div>
							</div>
						))}
					</div>

				</div>
			</div>
		</>
	);
};

export default Dashboards;
