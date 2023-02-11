import React from "react";
import { ProductsTable } from "../components/ProductsTable";
import { ToastContainer } from "react-toastify";

export function ProductsManeger() {
	return (
		<>
			<ProductsTable />
			<ToastContainer position="bottom-center" />
		</>
	);
}
