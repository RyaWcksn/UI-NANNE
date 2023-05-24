
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { ChatIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const Dummy = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar (always shown on desktop) */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					{/* Sidebar content */}

					<h1 className="text-2xl font-bold mb-4">Sessions</h1>
					<ul>
						<li>Chat session 1</li>
						<li>Chat session 2</li>
						<li>Chat session 3</li>
						{/* Add more chat sessions as needed */}
					</ul>
				</div>
			</div>

			{/* Mobile Navbar */}
			<div className="md:hidden">
				<div className="fixed z-50 inset-0 flex">
					<Transition
						show={isOpen}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0">
							<div
								className="absolute inset-0 bg-gray-600 opacity-75"
								onClick={toggleMenu}
							/>
						</div>
					</Transition>

					<Transition
						show={isOpen}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
							<div className="absolute top-0 right-0 -mr-12 pt-2">
								<button
									className="focus:outline-none"
									onClick={toggleMenu}
								>
									<XIcon className="h-6 w-6 text-gray-500" />
								</button>
							</div>
							{/* Navbar content */}
						</div>
					</Transition>
				</div>
			</div>

			{/* Main content */}
			<div className="flex flex-col flex-1 w-0 overflow-hidden">
				<div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
					{/* Navbar */}
					<div className="flex justify-between px-2 md:px-4 lg:px-8">
						<div className="flex items-center">
							{/* Burger menu */}
							<div className="flex-shrink-0">
								<button
									className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
									onClick={toggleMenu}
								>
									<span className="sr-only">Open main menu</span>
									<MenuIcon className="h-6 w-6" />
								</button>
							</div>
							{/* Logo */}
							<div className="hidden md:block">
								{/* Insert your logo here */}
							</div>
						</div>
						{/* Additional navbar content */}
					</div>
				</div>

				{/* Chat Page Content */}
				<div className="flex-1 flex bg-white overflow-hidden">
					{/* Chat page content */}
				</div>
			</div>
		</div>
	);
};

export default Dummy;
