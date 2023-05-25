import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import '@babel/polyfill';
import ModalPopup from '../components/ModalPopup';
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from 'react-pro-sidebar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis, SpeechSynthesisVoice } from 'react-speech-kit';
import { Link, useParams } from 'react-router-dom';


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
			breakPoint='md'
			collapsedWidth='160px'
			width='350px'
			className={`transition-all duration-300 ${sidebarOpen ? 'sidebar-open shadow-lg' : 'sidebar-closed'
				}`}
		>
			<Menu>
				{sessions.map((session) => {
					return (
						<div key={session.id} onClick={() => handleSessionClick(session)} className='cursor-pointer py-1'>
							<Link to={`/chat/${session.id}`}>
								<h1 className='text-center'>Session ID: {session.id}</h1>
							</Link>
						</div>
					);
				})}
			</Menu>
		</Sidebar>
	)
}

const NavBar = ({ toggleSidebar }) => {
	return (
		<nav className="bg-[#202123] md:hidden lg:hidden">
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

const ChatBody = ({ selectedSessionChats, sessionId}) => {
	const param = useParams()

	console.log(param, 'param');

	const [dataSessionById, setDataSessionById] = useState(null);

	const fetchSessionById = async () => {
		try {
			const response = await axios.post('/api/getSessionById', { sessionId: param });

			// Handle the response
			setDataSessionById(response.data);
		} catch (error) {
			// Handle any errors
			console.error(error);
		}
	};

	const {
		transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
	
	const [inputText, setInputText] = useState('');

	const { speak, voices } = useSpeechSynthesis();

	const nanne = localStorage.getItem("nanne")
	const name = localStorage.getItem("name")
	const id = localStorage.getItem("id")
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [messages, setMessages] = useState([
		{ id: 1, text: `Hi ${name}, How can I assist you today?` },
	]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
					sessionId: sessionId,
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

	const handleMic = () => {
		SpeechRecognition.startListening()
	}

	const handleSaved = () => {
		SpeechRecognition.stopListening()
		setInputText(transcript)
		resetTranscript()
	}

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const selectedVoice = voices.find(voice => voice.name === "Daniel");
	return (
		<div className="flex flex-col justify-evenly flex-grow bg-chat">
			<div className="my-3 flex flex-col basis-1/4 md:basis-1/7 place-items-center">
				<img src={nanne} alt="Nanne" className="w-32 h-32 mx-auto mb-2" />
				<button
					className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
					onClick={handleOpenModal}
				>
					Generate URL
				</button>
			</div>
			{/* The Chat */}
			<div className="overflow-y-auto mb-4 fit basis-2/5 md:basis-5/6" ref={chatboxRef}>
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
								<>
								<React.Fragment key={index}>
									<p className={`text-sm text-left ${message.isUser ? 'text-right' : ''}`}>{line}</p>
									{index !== message.text.split('\n').length - 1 && <br />} {/* Add <br /> element between lines */}
								</React.Fragment>
									<button onClick={() => speak({ 
										text: line, voice: selectedVoice
									})} className='mt-2'>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16"> <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/> <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/> <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/> </svg>
										</button>
								</>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="flex items-center px-2 order-last basis-1/4 md:basis-1/6">
				<input
					placeholder='Input your question here'
					type="text"
					className="border border-gray-400 p-2 flex-grow rounded-md focus:outline-gray-600 focus:text-gray-600"
					value={inputText}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onKeyPress={handleKeyPress}
				/>
				<div className='flex flex-row'>
					{inputText.length <= 0 
					? <div className='px-4 cursor-pointer flex' >
							<svg onClick={handleMic} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16"> <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/> <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/> </svg>
							{listening && <button onClick={handleSaved} className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">saved</button>}
						</div>
					: <button
						className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
						onClick={handleSendMessage}
					>Send</button>}
				</div>
				{showModal && (
					<ModalPopup content={modalContent} closeModal={handleCloseModal} />
				)}
			</div>
		</div>
	)
}

// const TextToSpeech = ({ text }) => {
//   const [isPaused, setIsPaused] = useState(false);
//   const [utterance, setUtterance] = useState(null);

//   useEffect(() => {
//     const synth = window.speechSynthesis;
//     const u = new SpeechSynthesisUtterance(text);

//     setUtterance(u);

//     return () => {
//       synth.cancel();
//     };
//   }, [text]);

//   const handlePlay = () => {
//     const synth = window.speechSynthesis;

//     if (isPaused) {
//       synth.resume();
//     }

//     synth.speak(utterance);

//     setIsPaused(false);
//   };

//   const handlePause = () => {
//     const synth = window.speechSynthesis;

//     synth.pause();

//     setIsPaused(true);
//   };

//   const handleStop = () => {
//     const synth = window.speechSynthesis;

//     synth.cancel();

//     setIsPaused(false);
//   };

//   return (
//     <div>
//       <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
//       <button onClick={handlePause}>Pause</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };


const ChatComponent = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedSessionChats, setSelectedSessionChats] = useState([]);
	const id = localStorage.getItem("id")
	const [sessionId, setSessionId] = useState(null); 
	const [dataSession, setDataSession] = useState(null); 

	console.log(dataSession);

	const fetchSessionByIdUser = async () => {
		try {
			const response = await axios.post('/api/getSession', { userId: Number(id) });

			// Handle the response
			setDataSession(response.data);
		} catch (error) {
			// Handle any errors
			console.error(error);
		}
	};

	const fetchIdSession = async () => {
		try {
			const response = await axios.post('/api/session', { userId: Number(id) });

			// Handle the response
			setSessionId(response.data.sessionId);
		} catch (error) {
			// Handle any errors
			console.error(error);
		}
	};

	console.log(sessionId);

	useEffect(() => {
		fetchIdSession()
		fetchSessionByIdUser()
	}, [])

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
				<div className='flex flex-row justify-between h-screen rounded-lg shadow-md '>
					<SideBar sidebarOpen={sidebarOpen} onSessionClick={handleSessionClick} />
					<ChatBody selectedSession={selectedSessionChats} sessionId={sessionId}/>
				</div>
			</div>
		</div>
	);
};

export default ChatComponent;