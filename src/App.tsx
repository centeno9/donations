import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

function App() {

	const auth = getAuth();


	return (
		<div>
			<h1>Lista</h1>
			<nav
				style={{
					borderBottom: "solid 1px",
					paddingBottom: "1rem",
				}}
			>
				<Link to="/inicio">Inicio</Link> |{" "}
				<Link to="/login">Iniciar sesión</Link>
				<button onClick={() => signOut(auth)} >Sign out</button>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
