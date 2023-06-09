import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import InitConfig from './config/config';
import Index from './pages/Index';
import ChatComponent from './pages/ChatPage';
import Dashboards from './pages/Dashboards';
import Dummy from './pages/Dummy';
import Session from './pages/Session'


InitConfig();

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route index element={<Index />} />
			<Route path='/chat' element={<ChatComponent />} />
			<Route path='/chat/:id' element={<Session />} />
			<Route path='/dashboard' element={<Dashboards />} />
			<Route path='/dummy' element={<Dummy />} />
		</Route>
	)
);

const App = ({ routes }) => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
export default App;
