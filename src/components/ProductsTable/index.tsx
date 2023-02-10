import React, { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import { ProductCard } from "../ProductCard";
import { ProductsTableContainer, ProductsTableContent } from "./styles";

export function ProductsTable() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [productsShown, setProductsShown] = useState<Product[]>([]);
	const [pageNumber, setPageNumber] = useState(0);

	const productsPerPage = 6;
	const pagesVisited = pageNumber * productsPerPage;

	function handleNextPage() {
		console.log("next");
	}

	useEffect(() => {
		async function loadProducts() {
			const productsResponse = await api.get("/products");
			setAllProducts(productsResponse.data);
			setProductsShown(productsResponse.data.slice(0, productsPerPage));
		}

		loadProducts();
	}, []);

	return (
		<ProductsTableContainer>
			<ProductsTableContent>
				<thead>
					<tr>
						<th>Imagem</th>
						<th>Nome</th>
						<th>Preço</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{productsShown.map((product) => (
						<ProductCard
							key={product._id}
							imagePath={product.imagePath}
							name={product.name}
							price={product.price}
						/>
					))}
				</tbody>
			</ProductsTableContent>
		</ProductsTableContainer>
	);
}
