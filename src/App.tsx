import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './Context/UserContext';


function App() {
	

	return (
		<AuthProvider >
			<div className='app-main-container '>
				<Navbar />
				<Outlet />
			</div>
		</AuthProvider>
	);
}

export default App;