import React, { useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import { api } from "../../utils/api";

import {
	IngredientsTableContainer,
	IngredientsTableActions,
	IngredientsTableContent,
	IngredientsTablePagination,
	IngredientsTableCenterContent,
	IngredientsTableSearchInput,
	IngredientsTableSearchInputContainer
} from "./styles";
import NextArrow from "../../assets/images/next-arrow.svg";
import PreviousArrow from "../../assets/images/previous-arrow.svg";
import CreateIcon from "../../assets/images/create-icon.svg";
import EmptySVG from "../../assets/images/empty.svg";
import SearchIcon from "../../assets/images/search-icon.svg";
import { Modal } from "../Modal";
import { Ingredient } from "../../types/Ingredient";
import { ModalDelete } from "../ModalDelete";
import { TableCard } from "../TableCard";
import { SmallForm } from "../SmallForm";
import { SmallFormEdit } from "../SmallFormEdit";


export function IngredientsTable() {
	const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
	const [ingredientsShown, setIngredientsShown] = useState<Ingredient[]>([]);

	const [pageNumber, setPageNumber] = useState(0);
	const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [isIngredientModalEditVisible, setIsIngredientModalEditVisible] = useState(false);

	const [selectedIngredient, setSelectedIngredient] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [filtredIngredients, setFiltredIngredients] = useState<Ingredient[]>([]);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const ingredientsPerPage = 6;
	const pagesVisited = pageNumber * ingredientsPerPage;
	const pagesLimit = pagesVisited + ingredientsPerPage;

	function handleNextPage() {
		if (filtredIngredients.length <= pagesLimit) return;
		setPageNumber(prevState => prevState + 1);
	}

	function handlePreviousPage() {
		if (pageNumber === 0) return;
		setPageNumber(prevState => prevState - 1);
	}

	function handleCloseIngredientModal() {
		setIsIngredientModalVisible(false);
	}

	function handleCloseIngredientModalEdit() {
		setIsIngredientModalEditVisible(false);
	}

	function handleOpenIngredientModalEdit() {
		setIsIngredientModalEditVisible(true);
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
			setFiltredIngredients(allIngredients);
			return;
		}

		const productsFiltred = allIngredients.filter((product) => {
			if (product.name.toLowerCase().includes(inputValue)) return product;
		});

		setPageNumber(0);
		setFiltredIngredients(productsFiltred);
	}

	useEffect(() => {
		setIngredientsShown(filtredIngredients.slice(pagesVisited, pagesLimit));
	}, [pageNumber, allIngredients, filtredIngredients]);

	useEffect(() => {
		setFiltredIngredients(allIngredients);
	}, [allIngredients]);

	useEffect(() => {
		const socket = socketIo("http://localhost:3001", {
			transports: ["websocket"],
		});

		socket.on("ingredient@new", (ingredient) => {
			setAllIngredients(prevState => prevState.concat(ingredient));
		});

		socket.on("ingredient@deleted", (ingredientId) => {
			setAllIngredients(prevState => prevState.filter((ingredient => ingredient._id !== ingredientId)));
		});

		socket.on("ingredient@updated", (ingredientReceived) => {
			setAllIngredients(prevState => {
				const ingredientIndex = prevState.findIndex(ingredient => ingredient._id === ingredientReceived._id);
				const newArray = new Array(...prevState);
				newArray[ingredientIndex] = ingredientReceived;
				return newArray;
			});
		});

	}, []);

	useEffect(() => {
		async function loadIngredients() {
			const categoriesResponse = await api.get("/ingredients");
			setAllIngredients(categoriesResponse.data);
			setFiltredIngredients(categoriesResponse.data);
			setIngredientsShown(categoriesResponse.data.slice(0, ingredientsPerPage));
		}

		loadIngredients();
	}, []);

	return (
		<>
			{isModalDeleteVisible && <ModalDelete path="/ingredients" itemName="ingrediente" itemId={selectedIngredient} onCloseModal={handleCloseModalDelete} />}
			{isIngredientModalEditVisible && (
				<Modal onCloseModal={handleCloseIngredientModalEdit} title="Editar Ingrediente">
					<SmallFormEdit itemId={selectedIngredient} itemName="Ingrediente" onCloseModal={handleCloseIngredientModalEdit} path="/ingredients" />
				</Modal>
			)}
			{isIngredientModalVisible && (
				<Modal onCloseModal={handleCloseIngredientModal} title="Criar ingrediente">
					<SmallForm itemName="Ingrediente" onCloseModal={handleCloseIngredientModal} path="/ingredients" />
				</Modal>
			)}
			<IngredientsTableContainer>
				<IngredientsTableActions>
					<IngredientsTableSearchInputContainer onClick={handleSearchInputFocus}>
						<img src={SearchIcon} />
						<IngredientsTableSearchInput
							type="search"
							placeholder="Buscar"
							value={searchValue}
							onChange={(e) => handleFilterProducts(e)}
							ref={searchInputRef}
						/>
					</IngredientsTableSearchInputContainer>

					<button onClick={() => setIsIngredientModalVisible(true)}>
						<img src={CreateIcon} />
						<span>Criar ingrediente</span>
					</button>
				</IngredientsTableActions>

				{filtredIngredients.length === 0
					? (
						<IngredientsTableCenterContent>
							<img src={EmptySVG} />
							<strong>Nenhum ingrediente encontrado</strong>
						</IngredientsTableCenterContent>
					) : (
						<>
							<IngredientsTableContent>
								<thead>
									<tr>
										<th>Icone</th>
										<th>Nome</th>
										<th>Ações</th>
									</tr>
								</thead>
								<tbody>
									{ingredientsShown.map((ingredient) => (
										<TableCard
											key={ingredient._id}
											icon={ingredient.icon}
											id={ingredient._id}
											name={ingredient.name}
											onDelete={handleOpenModalDelete}
											onEdit={handleOpenIngredientModalEdit}
											onSelectItem={setSelectedIngredient}
										/>
									))}
								</tbody>
							</IngredientsTableContent>
							<IngredientsTablePagination>
								<button onClick={handlePreviousPage}>
									<img src={PreviousArrow} />Anterior
								</button>
								<span>{pageNumber + 1} / {Math.ceil(filtredIngredients.length / ingredientsPerPage)}</span>
								<button onClick={handleNextPage}>
									Próximo <img src={NextArrow} />
								</button>
							</IngredientsTablePagination>
						</>
					)
				}
			</IngredientsTableContainer >
		</>
	);
}
