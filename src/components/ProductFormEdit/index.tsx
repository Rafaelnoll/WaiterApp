import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "../../types/Category";
import { Ingredient } from "../../types/Ingredient";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import {
	ProductModalForm,
	ProductModalFormButtonsContainer,
	ProductModalFormFileImageContainer,
	ProductModalFormLabel,
	ProductModalFormSelector,
	ProductModalFormTextAreaContainer
} from "./styles";

interface ProductFormEditProps {
	onCloseModal: () => void;
	productId: string;
}

export function ProductFormEdit({ onCloseModal, productId }: ProductFormEditProps) {
	const [file, setFile] = useState<File | string>("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
	const [description, setDescription] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		async function loadFormData() {
			const [
				categoriesResponse,
				productResponse,
				ingredientsResponse,
			] = await Promise.all([
				api.get("/categories"),
				api.get(`/products/${productId}`),
				api.get("/ingredients"),
			]);

			const product: Product = productResponse.data;

			setName(product.name);
			setPrice(String(product.price));
			setSelectedCategory(product.category);
			setDescription(product.description);
			setFile(product.imagePath);
			setCategories(categoriesResponse.data);
			setIngredients(ingredientsResponse.data);

			if (product.ingredients) {
				setSelectedIngredients(product.ingredients.map((ingredient) => ingredient._id));
			}

		}

		loadFormData();

	}, []);

	useEffect(() => {
		handleVerifyForm();
	});

	function handleSelectIngredient(ingredientId: string) {
		const alreadyChecked = selectedIngredients.findIndex((id) => id === ingredientId);

		if (alreadyChecked === -1) {
			setSelectedIngredients(prevState => {
				prevState.push(ingredientId);
				return prevState;
			});
			return;
		}

		setSelectedIngredients((prevState) => prevState.filter((id) => id !== selectedIngredients[alreadyChecked]));

	}


	function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		const file = e.target.files[0];
		setFile(file);
	}

	async function handleEditProduct(e: MouseEvent) {
		e.preventDefault();
		if (!file) return;
		if (!isFormValid) return;

		const selectedIngredientsModified = selectedIngredients.map((id) => {
			return ingredients[ingredients.findIndex((ingredient) => ingredient._id === id)];
		});

		const modifiedProduct = {
			name,
			price,
			description,
			category: selectedCategory,
			ingredients: JSON.stringify(selectedIngredientsModified),
		};

		await api.patch(`/products/${productId}`, modifiedProduct);

		onCloseModal();
		toast.success("Produto editado!");
	}

	function handleCancel(e: MouseEvent) {
		e.preventDefault();
		onCloseModal();
	}

	function handleVerifyForm() {
		let isValid = true;

		if (name.length === 0) {
			isValid = false;
		}
		if (price.length === 0) {
			isValid = false;
		}
		if (description.length === 0) {
			isValid = false;
		}
		if (!selectedCategory) {
			isValid = false;
		}
		if (!file) {
			isValid = false;
		}

		setIsFormValid(isValid);
	}

	return (
		<ProductModalForm>
			<div className="form-top-container">

				<ProductModalFormLabel>
					<strong>Nome</strong>
					<input
						type="Text"
						placeholder="Nome do produto..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="name"
					/>
				</ProductModalFormLabel>
				<ProductModalFormLabel>
					<strong>Preço</strong>
					<input
						type="number"
						placeholder="Preço do produto..."
						onChange={(e) => setPrice(e.target.value)}
						value={price}
						name="price"
					/>
				</ProductModalFormLabel>
			</div>
			<div className="form-main-container">
				<ProductModalFormSelector>
					<span>Categoria</span>
					<select
						onChange={(e) => setSelectedCategory(e.target.value)}
						value={selectedCategory}
						name="category"
					>
						<option value="" >Selecionar categoria</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>{category.icon} {category.name}</option>
						))}
					</select>
				</ProductModalFormSelector>

				<ProductModalFormSelector>
					<span>Ingredientes</span>
					<select
						onChange={(e) => handleSelectIngredient(e.target.value)}
						value={selectedIngredients}
						name="ingredients"
						multiple
					>
						<option value="" disabled>Selecionar ingredientes</option>
						{ingredients.map((ingredient) => (
							<option key={ingredient._id} value={ingredient._id}>{ingredient.icon} {ingredient.name}</option>
						))}
					</select>
				</ProductModalFormSelector>

				<ProductModalFormTextAreaContainer>
					<span>Descrição</span>
					<textarea
						placeholder="Descrição do produto..."
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						name="description"
					/>
				</ProductModalFormTextAreaContainer>
				<ProductModalFormFileImageContainer>
					<span>Imagem</span>
					<div className="file-selector">
						<label htmlFor="file-input">
							Escolha uma imagem...
						</label>
						<strong>Arquivo escolhido:</strong>
						{typeof file === "string"
							? <span>{file}</span>
							: <span>{file ? file.name : "Nenhum"}</span>
						}
					</div>
					<input
						type="file"
						accept=".png"
						id="file-input"
						onChange={(e) => handleSelectFile(e)}
						name="filename"
					/>
				</ProductModalFormFileImageContainer>
			</div>
			<ProductModalFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleEditProduct(e)}>
					Editar Produto
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</ProductModalFormButtonsContainer>
		</ProductModalForm>
	);
}
