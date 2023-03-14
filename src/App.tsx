import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { CategoriesManeger } from "./pages/CategoriesManeger";
import { Home } from "./pages/Home";
import { IngredientsManeger } from "./pages/IngredientsManeger";
import { ProductsManeger } from "./pages/ProductsManeger";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/ingredients" element={<IngredientsManeger />} />
					<Route path="/categories" element={<CategoriesManeger />} />
					<Route path="/maneger" element={<ProductsManeger />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
