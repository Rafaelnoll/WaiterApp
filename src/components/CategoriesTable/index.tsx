import React, { useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import { api } from "../../utils/api";

import {
	CategoriesTableContainer,
	CategoriesTableActions,
	CategoriesTableContent,
	CategoriesTablePagination,
	CategoriesTableCenterContent,
	CategoriesTableSearchInput,
	CategoriesTableSearchInputContainer
} from "./styles";
import NextArrow from "../../assets/images/next-arrow.svg";
import PreviousArrow from "../../assets/images/previous-arrow.svg";
import CreateIcon from "../../assets/images/create-icon.svg";
import EmptySVG from "../../assets/images/empty.svg";
import SearchIcon from "../../assets/images/search-icon.svg";
import { Modal } from "../Modal";
import { ModalDelete } from "../ModalDelete";
import { Category } from "../../types/Category";
import { CategoryForm } from "../CategoryForm";
import { CategoryFormEdit } from "../CategoryFormEdit";
import { TableCard } from "../TableCard";


export function CategoriesTable() {
	const [allCategories, setAllCategories] = useState<Category[]>([]);
	const [categoriesShown, setCategoriesShown] = useState<Category[]>([]);

	const [pageNumber, setPageNumber] = useState(0);
	const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [isCategoryModalEditVisible, setIsCategoryModalEditVisible] = useState(false);

	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [filtredCategories, setFiltredCategories] = useState<Category[]>([]);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const productsPerPage = 6;
	const pagesVisited = pageNumber * productsPerPage;
	const pagesLimit = pagesVisited + productsPerPage;

	function handleNextPage() {
		if (filtredCategories.length <= pagesLimit) return;
		setPageNumber(prevState => prevState + 1);
	}

	function handlePreviousPage() {
		if (pageNumber === 0) return;
		setPageNumber(prevState => prevState - 1);
	}

	function handleCloseCategoryModal() {
		setIsCategoryModalVisible(false);
	}

	function handleCloseCategoryModalEdit() {
		setIsCategoryModalEditVisible(false);
	}

	function handleOpenCategoryModalEdit() {
		setIsCategoryModalEditVisible(true);
	}

	function handleCloseModalDelete() {
		setIsModalDeleteVisible(false);
	}

	function handleOpenModalDelete() {
		setIsModalDeleteVisible(true);
	}

	function handleSearchInputFocus() {
		if (searchInputRef.current === null) return;
		searchInputRef.current.focus();
	}

	function handleFilterProducts(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue = e.target.value;
		setSearchValue(inputValue);

		if (inputValue.length === 0) {
			setFiltredCategories(allCategories);
			return;
		}

		const productsFiltred = allCategories.filter((product) => {
			if (product.name.toLowerCase().includes(inputValue)) return product;
		});

		setPageNumber(0);
		setFiltredCategories(productsFiltred);
	}

	useEffect(() => {
		setCategoriesShown(filtredCategories.slice(pagesVisited, pagesLimit));
	}, [pageNumber, allCategories, filtredCategories]);

	useEffect(() => {
		setFiltredCategories(allCategories);
	}, [allCategories]);

	useEffect(() => {
		const socket = socketIo("http://localhost:3001", {
			transports: ["websocket"],
		});

		socket.on("category@new", (category) => {
			setAllCategories(prevState => prevState.concat(category));
		});

		socket.on("category@deleted", (categoryId) => {
			setAllCategories(prevState => prevState.filter((category => category._id !== categoryId)));
		});

		socket.on("category@updated", (categoryReceived) => {
			setAllCategories(prevState => {
				const productIndex = prevState.findIndex(category => category._id === categoryReceived._id);
				const newArray = new Array(...prevState);
				newArray[productIndex] = categoryReceived;
				return newArray;
			});
		});

	}, []);

	useEffect(() => {
		async function loadProducts() {
			const categoriesResponse = await api.get("/categories");
			setAllCategories(categoriesResponse.data);
			setFiltredCategories(categoriesResponse.data);
			setCategoriesShown(categoriesResponse.data.slice(0, productsPerPage));
		}

		loadProducts();
	}, []);

	return (
		<>
			{isModalDeleteVisible && <ModalDelete path="/categories" itemName="categoria" itemId={selectedCategory} onCloseModal={handleCloseModalDelete} />}
			{isCategoryModalEditVisible && (
				<Modal onCloseModal={handleCloseCategoryModalEdit} title="Editar Categoria">
					<CategoryFormEdit onCloseModal={handleCloseCategoryModalEdit} categoryId={selectedCategory} />
				</Modal>
			)}
			{isCategoryModalVisible && (
				<Modal onCloseModal={handleCloseCategoryModal} title="Criar produto">
					<CategoryForm onCloseModal={handleCloseCategoryModal} />
				</Modal>
			)}
			<CategoriesTableContainer>
				<CategoriesTableActions>
					<CategoriesTableSearchInputContainer onClick={handleSearchInputFocus}>
						<img src={SearchIcon} />
						<CategoriesTableSearchInput
							type="search"
							placeholder="Buscar"
							value={searchValue}
							onChange={(e) => handleFilterProducts(e)}
							ref={searchInputRef}
						/>
					</CategoriesTableSearchInputContainer>

					<button onClick={() => setIsCategoryModalVisible(true)}>
						<img src={CreateIcon} />
						<span>Criar categoria</span>
					</button>
				</CategoriesTableActions>

				{filtredCategories.length === 0
					? (
						<CategoriesTableCenterContent>
							<img src={EmptySVG} />
							<strong>Nenhuma categoria encontrada</strong>
						</CategoriesTableCenterContent>
					) : (
						<>
							<CategoriesTableContent>
								<thead>
									<tr>
										<th>Icone</th>
										<th>Nome</th>
										<th>Ações</th>
									</tr>
								</thead>
								<tbody>
									{categoriesShown.map((category) => (
										<TableCard
											key={category._id}
											icon={category.icon}
											name={category.name}
											id={category._id}
											onSelectItem={setSelectedCategory}
											onEdit={handleOpenCategoryModalEdit}
											onDelete={handleOpenModalDelete}
										/>
									))}
								</tbody>
							</CategoriesTableContent>
							<CategoriesTablePagination>
								<button onClick={handlePreviousPage}>
									<img src={PreviousArrow} />Anterior
								</button>
								<span>{pageNumber + 1} / {Math.ceil(filtredCategories.length / productsPerPage)}</span>
								<button onClick={handleNextPage}>
									Próximo <img src={NextArrow} />
								</button>
							</CategoriesTablePagination>
						</>
					)
				}
			</CategoriesTableContainer >
		</>
	);
}
