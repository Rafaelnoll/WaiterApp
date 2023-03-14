import React from "react";
import { ToastContainer } from "react-toastify";
import { IngredientsTable } from "../components/IngredientsTable";

export function IngredientsManeger() {
	return (
		<>
			<IngredientsTable />
			<ToastContainer position="bottom-center" />
		</>
	);
}
