import React from "react";
import { ToastContainer } from "react-toastify";
import { Orders } from "../components/Orders";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
	return (
		<>
			<Orders />
			<ToastContainer position="bottom-center" />
		</>
	);
}
