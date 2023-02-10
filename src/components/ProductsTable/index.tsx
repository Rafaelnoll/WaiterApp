import React, { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import { ProductCard } from "../ProductCard";
import { ProductsTableContainer, ProductsTableContent, ProductsTablePagination } from "./styles";
import NextArrow from "../../assets/images/next-arrow.svg";
import PreviousArrow from "../../assets/images/previous-arrow.svg";

export function ProductsTable() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [productsShown, setProductsShown] = useState<Product[]>([]);
	const [pageNumber, setPageNumber] = useState(0);

	const productsPerPage = 6;
	const pagesVisited = pageNumber * productsPerPage;
	const pagesLimit = pagesVisited + productsPerPage;

	function handleNextPage() {
		if (allProducts.length < pagesLimit) return;
		setPageNumber(prevState => prevState + 1);
	}

	function handlePreviousPage() {
		if (pageNumber === 0) return;
		setPageNumber(prevState => prevState - 1);
	}

	useEffect(() => {
		async function loadProducts() {
			const productsResponse = await api.get("/products");
			setAllProducts(productsResponse.data);
			setProductsShown(productsResponse.data.slice(0, productsPerPage));
		}

		loadProducts();
	}, []);

	useEffect(() => {
		setProductsShown(allProducts.slice(pagesVisited, pagesLimit));
	}, [pageNumber]);

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
			<ProductsTablePagination>
				<button onClick={handlePreviousPage}>
					<img src={PreviousArrow} />Anterior
				</button>
				<span>{pageNumber + 1} / {(allProducts.length / productsPerPage).toFixed(0)}</span>
				<button onClick={handleNextPage}>
					Próximo <img src={NextArrow} />
				</button>
			</ProductsTablePagination>
		</ProductsTableContainer>
	);
}
