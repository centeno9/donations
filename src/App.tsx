import React, { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
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