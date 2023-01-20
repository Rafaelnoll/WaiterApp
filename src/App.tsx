import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Header } from "./components/Header";
import { Orders } from "./components/Orders";

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Orders />
			<ToastContainer position="bottom-center" />
		</>
	);
}

export default App;
