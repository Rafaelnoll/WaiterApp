import React from "react";
import { ToastContainer } from "react-toastify";
import { CategoriesTable } from "../components/CategoriesTable";

export function CategoriesManeger() {
	return (
		<>
			<CategoriesTable />
			<ToastContainer position="bottom-center" />
		</>
	);
}
