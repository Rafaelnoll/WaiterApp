import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "../../types/Category";
import { api } from "../../utils/api";
import {
	ProductModalForm,
	ProductModalFormButtonsContainer,
	ProductModalFormFileImageContainer,
	ProductModalFormLabel,
	ProductModalFormSelector,
	ProductModalFormTextAreaContainer
} from "./styles";

interface ProductFormProps {
	onCloseModal: () => void;
}

export function ProductForm({ onCloseModal }: ProductFormProps) {
	const [file, setFile] = useState<File | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		async function loadCategories() {
			const categoriesResponse = await api.get("/categories");
			setCategories(categoriesResponse.data);
		}

		loadCategories();
	}, []);

	function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		const file = e.target.files[0];
		setFile(file);
	}

	async function handleCreateProduct(e: MouseEvent) {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();

		formData.append("image", file);
		formData.append("name", name);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("category", selectedCategory);

		await api.post("/products", formData);

		setName("");
		setPrice("");
		setSelectedCategory("");
		setDescription("");
		setFile(null);
		toast.success("Produto criado!");
	}

	function handleCancel(e: MouseEvent) {
		e.preventDefault();
		onCloseModal();
	}

	return (
		<ProductModalForm
			method="post"
			encType="multipart/form-data"
			action="http://localhost:3001/products"
		>
			<div className="form-top-container">
				<ProductModalFormLabel>
					<span>Nome</span>
					<input
						type="Text"
						placeholder="Nome do produto..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="name"
					/>
				</ProductModalFormLabel>
				<ProductModalFormLabel>
					<span>Preço</span>
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
						<span>{file ? file.name : "Nenhum"}</span>
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
				<button className="button-create" onClick={(e) => handleCreateProduct(e)}>
					Criar Produto
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</ProductModalFormButtonsContainer>
		</ProductModalForm>
	);
}
