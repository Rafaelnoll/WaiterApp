import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../utils/api";
import {
	IngredientModalForm,
	IngredientModalFormButtonsContainer,
	IngredientModalFormLabel,
} from "./styles";

interface IngredientFormProps {
	onCloseModal: () => void;
}

export function IngredientForm({ onCloseModal }: IngredientFormProps) {
	const [icon, setIcon] = useState("");
	const [name, setName] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleCreateIngredient(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.post("/ingredients", { icon, name });

		setName("");
		setIcon("");
		toast.success("Ingrediente criado!");
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
		<IngredientModalForm>
			<div className="form-top-container">

				<IngredientModalFormLabel>
					<strong>Icone</strong>
					<input
						type="text"
						placeholder="Icone"
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="name"
					/>
				</IngredientModalFormLabel>
				<IngredientModalFormLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder="Nome da categoria..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="price"
					/>
				</IngredientModalFormLabel>
			</div>

			<IngredientModalFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleCreateIngredient(e)}>
					Criar Ingrediente
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</IngredientModalFormButtonsContainer>
		</IngredientModalForm>
	);
}
