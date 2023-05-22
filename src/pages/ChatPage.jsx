import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ModalPopup from '../components/ModalPopup';

const ChatComponent = () => {
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

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className="justify-center items-center h-screen">
			<h1 className="text-2xl font-bold mb-4">Nann-E</h1>
			<div className="flex flex-col justify-evenly bg-white rounded-lg shadow-md p-4 h-screen">
				<div className="mb-4">
					<img src={nanne} alt="Nanne" className="w-32 h-32 mx-auto" />
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						onClick={handleOpenModal}
					>
						Generate URL
					</button>
				</div>
				<div className="flex flex-col flex-grow justify-evenly">
					<div className="overflow-y-auto mb-4" ref={chatboxRef} style={{ maxHeight: '300px' }}>
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
							onKeyDown={handleKeyDown} // Added event handler for key down
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
			</div>
		</div>
	);
};

export default ChatComponent;
