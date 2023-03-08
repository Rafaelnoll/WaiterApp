import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { ProductsManeger } from "./pages/ProductsManeger";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/maneger" element={<ProductsManeger />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
