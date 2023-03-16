import React, { useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import {
	ProductsTableContainer,
	ProductsTableActions,
	ProductsTableContent,
	ProductsTablePagination,
	ProductsTableCenterContent,
	ProductsTableSearchInput,
	ProductsTableSearchInputContainer
} from "./styles";
import NextArrow from "../../assets/images/next-arrow.svg";
import PreviousArrow from "../../assets/images/previous-arrow.svg";
import CreateIcon from "../../assets/images/create-icon.svg";
import EmptySVG from "../../assets/images/empty.svg";
import SearchIcon from "../../assets/images/search-icon.svg";
import { Modal } from "../Modal";
import { ModalDelete } from "../ModalDelete";
import { ProductForm } from "../ProductForm";
import { ProductFormEdit } from "../ProductFormEdit";
import { TableCard } from "../TableCard";
import { ProductDetails } from "../ProductDetails";

export function ProductsTable() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [productsShown, setProductsShown] = useState<Product[]>([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [filtredProducts, setFiltredProducts] = useState<Product[]>([]);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	// Modals
	const [isProductModalVisible, setIsProductModalVisible] = useState(false);
	const [isProductDetailsModalVisible, setIsProductDetailsModalVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [isProductModalEditVisible, setIsProductModalEditVisible] = useState(false);

	const productsPerPage = 6;
	const pagesVisited = pageNumber * productsPerPage;
	const pagesLimit = pagesVisited + productsPerPage;

	function handleNextPage() {
		if (filtredProducts.length <= pagesLimit) return;
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

	function handleOpenProductModalDetails() {
		setIsProductDetailsModalVisible(true);
	}

	useEffect(() => {
		async function loadProducts() {
			const productsResponse = await api.get("/products");
			setAllProducts(productsResponse.data);
			setFiltredProducts(productsResponse.data);
			setProductsShown(productsResponse.data.slice(0, productsPerPage));
		}

		loadProducts();
	}, []);

	useEffect(() => {
		setFiltredProducts(allProducts);
	}, [allProducts]);

	useEffect(() => {
		setProductsShown(filtredProducts.slice(pagesVisited, pagesLimit));
	}, [pageNumber, allProducts, filtredProducts]);

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

	function handleSearchInputFocus() {
		if (searchInputRef.current === null) return;
		searchInputRef.current.focus();
	}

	function handleFilterProducts(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue = e.target.value;
		setSearchValue(inputValue);

		if (inputValue.length === 0) {
			setFiltredProducts(allProducts);
			return;
		}

		const productsFiltred = allProducts.filter((product) => {
			if (product.name.toLowerCase().includes(inputValue)) return product;
		});

		setPageNumber(0);
		setFiltredProducts(productsFiltred);
	}

	function handleSelectProductDetails(productId: string) {
		const productIndex = allProducts.findIndex((product) => product._id === productId);
		return allProducts[productIndex];
	}

	return (
		<>
			{isModalDeleteVisible && <ModalDelete itemId={selectedProduct} onCloseModal={handleCloseModalDelete} path="/products" itemName="produto" />}
			{isProductModalEditVisible && (
				<Modal onCloseModal={handleCloseProductModalEdit} title="Editar produto">
					<ProductFormEdit onCloseModal={handleCloseProductModalEdit} productId={selectedProduct} />
				</Modal>
			)}
			{isProductModalVisible && (
				<Modal onCloseModal={handleCloseProductModal} title="Criar produto">
					<ProductForm onCloseModal={handleCloseProductModal} />
				</Modal>
			)}
			{isProductDetailsModalVisible && (
				<Modal onCloseModal={() => setIsProductDetailsModalVisible(false)} title="Detalhes do produto">
					<ProductDetails product={handleSelectProductDetails(selectedProduct)} />
				</Modal>
			)}
			<ProductsTableContainer>
				<ProductsTableActions>
					<ProductsTableSearchInputContainer onClick={handleSearchInputFocus}>
						<img src={SearchIcon} />
						<ProductsTableSearchInput
							type="search"
							placeholder="Buscar"
							value={searchValue}
							onChange={(e) => handleFilterProducts(e)}
							ref={searchInputRef}
						/>
					</ProductsTableSearchInputContainer>

					<button onClick={() => setIsProductModalVisible(true)}>
						<img src={CreateIcon} />
						<span>Criar produto</span>
					</button>
				</ProductsTableActions>

				{filtredProducts.length === 0
					? (
						<ProductsTableCenterContent>
							<img src={EmptySVG} />
							<strong>Nenhum produto encontrado</strong>
						</ProductsTableCenterContent>
					) : (
						<>
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
										<TableCard
											key={product._id}
											id={product._id}
											imagePath={product.imagePath}
											name={product.name}
											price={product.price}
											onSelectItem={setSelectedProduct}
											onEdit={handleOpenProductModalEdit}
											onDelete={handleOpenModalDelete}
											onSeeDetails={handleOpenProductModalDetails}
											showButtonDetails={true}
										/>
									))}
								</tbody>
							</ProductsTableContent>
							<ProductsTablePagination>
								<button onClick={handlePreviousPage}>
									<img src={PreviousArrow} />Anterior
								</button>
								<span>{pageNumber + 1} / {Math.ceil(filtredProducts.length / productsPerPage)}</span>
								<button onClick={handleNextPage}>
									Próximo <img src={NextArrow} />
								</button>
							</ProductsTablePagination>
						</>
					)
				}
			</ProductsTableContainer >
		</>
	);
}
