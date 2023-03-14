import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Ingredient } from "../../types/Ingredient";
import { api } from "../../utils/api";
import {
	IngredientsModalForm,
	IngredientsModalFormButtonsContainer,
	IngredientsModalFormLabel,
} from "./styles";

interface IngredientFormEditProps {
	onCloseModal: () => void;
	ingredientId: string;
}

export function IngredientFormEdit({ onCloseModal, ingredientId }: IngredientFormEditProps) {
	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		async function loadIngredientData() {
			const ingredientResponse = await api.get(`/ingredients/${ingredientId}`);

			const ingredient: Ingredient = ingredientResponse.data;

			setName(ingredient.name);
			setIcon(ingredient.icon);
		}

		loadIngredientData();
	}, []);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleEditIngredient(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.patch(`/ingredients/${ingredientId}`, { name, icon });

		onCloseModal();
		toast.success("Ingrediente editado!");
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
		<IngredientsModalForm>
			<div className="form-top-container">

				<IngredientsModalFormLabel>
					<strong>Icone</strong>
					<input
						type="Text"
						placeholder="Icone..."
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="icon"
					/>
				</IngredientsModalFormLabel>
				<IngredientsModalFormLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder="Nome do ingrediente..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="name"
					/>
				</IngredientsModalFormLabel>
			</div>

			<IngredientsModalFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleEditIngredient(e)}>
					Editar Ingrediente
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</IngredientsModalFormButtonsContainer>
		</IngredientsModalForm>
	);
}
