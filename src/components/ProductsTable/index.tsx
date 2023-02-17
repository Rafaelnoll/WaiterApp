import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import { ProductCard } from "../ProductCard";
import {
	ProductsTableContainer,
	ProductsTableActions,
	ProductsTableContent,
	ProductsTablePagination
} from "./styles";
import NextArrow from "../../assets/images/next-arrow.svg";
import PreviousArrow from "../../assets/images/previous-arrow.svg";
import CreateIcon from "../../assets/images/create-icon.svg";
import { ProductModal } from "../ProductModal";
import { ModalDelete } from "../ModalDelete";
import { ProductForm } from "../ProductForm";
import { ProductFormEdit } from "../ProductFormEdit";

export function ProductsTable() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [productsShown, setProductsShown] = useState<Product[]>([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [isProductModalVisible, setIsProductModalVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [isProductModalEditVisible, setIsProductModalEditVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState("");

	const productsPerPage = 6;
	const pagesVisited = pageNumber * productsPerPage;
	const pagesLimit = pagesVisited + productsPerPage;

	function handleNextPage() {
		if (allProducts.length <= pagesLimit) return;
		setPageNumber(prevState => prevState + 1);
	}

	function handlePreviousPage() {
		if (pageNumber === 0) return;
		setPageNumber(prevState => prevState - 1);
	}

	function handleCloseProductModal() {
		setIsProductModalVisible(false);
	}

	function handleCloseProductModalEdit() {
		setIsProductModalEditVisible(false);
	}

	function handleOpenProductModalEdit() {
		setIsProductModalEditVisible(true);
	}

	function handleCloseModalDelete() {
		setIsModalDeleteVisible(false);
	}

	function handleOpenModalDelete() {
		setIsModalDeleteVisible(true);
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
	}, [pageNumber, allProducts]);

	useEffect(() => {
		const socket = socketIo("http://localhost:3001", {
			transports: ["websocket"],
		});

		socket.on("product@new", (product) => {
			setAllProducts(prevState => prevState.concat(product));
		});

		socket.on("product@deleted", (productId) => {
			setAllProducts(prevState => prevState.filter((product => product._id !== productId)));
		});

		socket.on("product@updated", (productReceived) => {
			setAllProducts(prevState => {
				const productIndex = prevState.findIndex(product => product._id === productReceived._id);
				const newArray = new Array(...prevState);
				newArray[productIndex] = productReceived;
				return newArray;
			});
		});

	}, []);

	return (
		<>
			{isModalDeleteVisible && <ModalDelete productId={selectedProduct} onCloseModal={handleCloseModalDelete} />}
			{isProductModalEditVisible && (
				<ProductModal onCloseModal={handleCloseProductModalEdit} title="Editar produto">
					<ProductFormEdit onCloseModal={handleCloseProductModalEdit} productId={selectedProduct} />
				</ProductModal>
			)}
			{isProductModalVisible && (
				<ProductModal onCloseModal={handleCloseProductModal} title="Criar produto">
					<ProductForm onCloseModal={handleCloseProductModal} />
				</ProductModal>
			)}
			<ProductsTableContainer>
				<ProductsTableActions>
					<button onClick={() => setIsProductModalVisible(true)}>
						<img src={CreateIcon} />
						<span>Criar produto</span>
					</button>
				</ProductsTableActions>
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
								id={product._id}
								imagePath={product.imagePath}
								name={product.name}
								price={product.price}
								onSelectProduct={setSelectedProduct}
								onEdit={handleOpenProductModalEdit}
								onDelete={handleOpenModalDelete}
							/>
						))}
					</tbody>
				</ProductsTableContent>
				<ProductsTablePagination>
					<button onClick={handlePreviousPage}>
						<img src={PreviousArrow} />Anterior
					</button>
					<span>{pageNumber + 1} / {Math.ceil(allProducts.length / productsPerPage)}</span>
					<button onClick={handleNextPage}>
						Próximo <img src={NextArrow} />
					</button>
				</ProductsTablePagination>
			</ProductsTableContainer>
		</>
	);
}
