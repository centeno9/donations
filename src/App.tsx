import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

function App() {

	

	return (
		<div>
			<h1>Lista</h1>
			
			<Outlet />
		</div>
	);
}

export default App;
