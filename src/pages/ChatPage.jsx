import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ChatComponent = () => {
	const nanne = localStorage.getItem("nanne")
	const name = localStorage.getItem("name")
	const id = localStorage.getItem("id")
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

	return (
		<div className="justify-center items-center h-screen">
			<div className="flex flex-col justify-evenly bg-white rounded-lg shadow-md p-4 h-screen">
				<div className="mb-4">
					<img src={nanne} alt="Nanne" className="w-32 h-32 mx-auto" />
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
									<p className={`text-sm ${message.isUser ? 'text-right' : ''}`}>{message.text}</p>
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
						<button
							className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
							onClick={handleSendMessage}
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatComponent;
