import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "../../types/Category";
import { api } from "../../utils/api";
import {
	CategoryModalForm,
	CategoryModalFormButtonsContainer,
	CategoryModalFormLabel,
} from "./styles";

interface CategoryFormEditProps {
	onCloseModal: () => void;
	categoryId: string;
}

export function CategoryFormEdit({ onCloseModal, categoryId }: CategoryFormEditProps) {
	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		async function loadCategoryData() {
			const categoryResponse = await api.get(`/categories/${categoryId}`);

			const category: Category = categoryResponse.data;

			setName(category.name);
			setIcon(category.icon);
		}

		loadCategoryData();
	}, []);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleEditCategory(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.patch(`/categories/${categoryId}`, { name, icon });

		onCloseModal();
		toast.success("Categoria editada!");
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
		if (icon?.length === 0) {
			isValid = false;
		}

		setIsFormValid(isValid);
	}

	return (
		<CategoryModalForm>
			<div className="form-top-container">

				<CategoryModalFormLabel>
					<strong>Icone</strong>
					<input
						type="Text"
						placeholder="Icone..."
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="icon"
					/>
				</CategoryModalFormLabel>
				<CategoryModalFormLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder="Nome da categoria..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="name"
					/>
				</CategoryModalFormLabel>
			</div>

			<CategoryModalFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleEditCategory(e)}>
					Editar Categoria
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</CategoryModalFormButtonsContainer>
		</CategoryModalForm>
	);
}
