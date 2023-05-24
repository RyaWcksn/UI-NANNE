import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ModalPopup from '../components/ModalPopup';
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from 'react-pro-sidebar';


const SideBar = ({ sidebarOpen, onSessionClick }) => {
	const sessions = [
		{
			id: 1,
			dateTime: '2023-05-23 10:00 AM',
			chats: [
				{ id: 1, text: 'Hello', isUser: 'yes' },
				{ id: 2, text: 'Hi, how can I help you?', isUser: 'no' },
				// Add more chat messages for the session
			],
		},
		{
			id: 2,
			dateTime: '2023-05-24 02:30 PM',
			chats: [
				{ id: 1, text: 'Welcome!', isUser: 'yes' },
				{ id: 2, text: 'Thank you!', isUser: 'no' },
				// Add more chat messages for the session
			],
		},
	];
	const handleSessionClick = (session) => {
		onSessionClick(session.chats);
	};
	console.log(sidebarOpen)
	return (
		<Sidebar
			collapsed={sidebarOpen}
			breakPoint="md"
			className={`transition-all duration-300 ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
				}`}
		>
			<Menu>
				{sessions.map((session) => {
					return (
						<div key={session.id} onClick={() => handleSessionClick(session)}>
							<h1>Session ID: {session.id}</h1>
						</div>
					);
				})}
			</Menu>
		</Sidebar>
	)
}

const NavBar = ({ toggleSidebar }) => {
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0">
						<h1 className="text-white items-center">Nann-E</h1>
					</div>
					<div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
							{/* Add your navbar links or buttons here */}
						</div>
					</div>
					<div className="md:hidden">
						<button
							className="text-gray-500"
							onClick={toggleSidebar}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-6 h-6"
							>
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

const ChatBody = ({ selectedSessionChats }) => {
	const nanne = localStorage.getItem("nanne")
	const name = localStorage.getItem("name")
	const id = localStorage.getItem("id")
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [messages, setMessages] = useState([
		{ id: 2, text: `Hi ${name}, How can I assist you today?` },
	]);
	const [inputText, setInputText] = useState('');

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};
	const handleOpenModal = () => {
		const body = {
			id: Number(id),
			name: name,
		};
		axios
			.post('/api/generate', body)
			.then((response) => {
				setModalContent(response.data.link);
				setShowModal(true);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};


	const handleSendMessage = () => {
		if (inputText.trim() !== '') {
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: Date.now(), text: inputText, isUser: true },
			]);
			setInputText('');
			setTimeout(() => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ id: Date.now(), text: "Hmm, let me think about that...", isUser: false },
				]);
			}, 1000);
			axios
				.post('/api/chat', {
					message: inputText,
					id: Number(id),
					name: name,
				})
				.then((response) => {
					// Simulate Nanne's response after receiving a successful response from the API
					setMessages((prevMessages) => [
						...prevMessages,
						{ id: Date.now(), text: response.data.response, isUser: false },
					]);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	};

	useEffect(() => {
		if (selectedSessionChats) {
			setMessages(selectedSessionChats);
		}
	}, [selectedSessionChats]);


	const chatboxRef = useRef(null);
	useEffect(() => {
		// Scroll to the bottom of the chatbox when new messages are added
		chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
	}, [messages]);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && e.shiftKey) {
			e.preventDefault();
			setInputText((prevInputText) => prevInputText + '\n');
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};
	return (
		<div className="flex flex-col flex-grow justify-evenly">
			<div className="mb-1">
				<img src={nanne} alt="Nanne" className="w-32 h-32 mx-auto" />
				<button
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
					onClick={handleOpenModal}
				>
					Generate URL
				</button>
			</div>
			<div className="overflow-y-auto mb-4" ref={chatboxRef} style={{ maxHeight: '200px' }}>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex p-2 rounded-lg ${message.isUser ? 'justify-end' : 'justify-start'
							}`}
					>
						<div
							className={`p-2 rounded-lg ${message.isUser ? 'bg-green-100' : 'bg-blue-100'
								}`}
						>
							{message.text && message.text.split('\n').map((line, index) => (
								<React.Fragment key={index}>
									<p className={`text-sm text-left ${message.isUser ? 'text-right' : ''}`}>{line}</p>
									{index !== message.text.split('\n').length - 1 && <br />} {/* Add <br /> element between lines */}
								</React.Fragment>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="flex items-center">
				<input
					type="text"
					className="border border-gray-400 p-2 rounded-lg flex-grow"
					value={inputText}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onKeyPress={handleKeyPress}
				/>
				<div className='flex flex-row'>
					<button
						className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						onClick={handleSendMessage}
					>Send</button>
				</div>
				{showModal && (
					<ModalPopup content={modalContent} closeModal={handleCloseModal} />
				)}
			</div>
		</div>
	)
}

const ChatComponent = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedSessionChats, setSelectedSessionChats] = useState([]);

	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleSessionClick = (chats) => {
		setSelectedSessionChats(chats);
	};

	return (
		<div className="justify-center items-center h-screen overflow-hidden">
			<NavBar toggleSidebar={handleToggleSidebar} />
			<div className="flex flex-col bg-white rounded-lg shadow-md ">
				<div className='flex flex-row justify-between h-screen p-4 rounded-lg shadow-md '>
					<SideBar sidebarOpen={sidebarOpen} onSessionClick={handleSessionClick} />
					<ChatBody selectedSession={selectedSessionChats} />
				</div>
			</div>
		</div>
	);
};

export default ChatComponent;
