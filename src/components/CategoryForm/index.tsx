import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../utils/api";
import {
	CategoryModalForm,
	CategoryModalFormButtonsContainer,
	CategoryModalFormLabel,
} from "./styles";

interface CategoryFormProps {
	onCloseModal: () => void;
}

export function CategoryForm({ onCloseModal }: CategoryFormProps) {
	const [icon, setIcon] = useState("");
	const [name, setName] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleCreateCategory(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.post("/categories", { icon, name });

		setName("");
		setIcon("");
		toast.success("Categoria criado!");
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
						type="text"
						placeholder="Icone"
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="name"
					/>
				</CategoryModalFormLabel>
				<CategoryModalFormLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder="Nome da categoria..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="price"
					/>
				</CategoryModalFormLabel>
			</div>

			<CategoryModalFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleCreateCategory(e)}>
					Criar Categoria
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</CategoryModalFormButtonsContainer>
		</CategoryModalForm>
	);
}
