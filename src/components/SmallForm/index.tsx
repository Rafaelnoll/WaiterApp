import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../utils/api";
import {
	ModalSmallForm,
	ModalSmallFormButtonsContainer,
	ModalSmallFormLabel,
} from "./styles";

interface SmallFormProps {
	onCloseModal: () => void;
	path: string;
	itemName: string;
}

export function SmallForm({ onCloseModal, path, itemName }: SmallFormProps) {
	const [icon, setIcon] = useState("");
	const [name, setName] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleCreate(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.post(path, { icon, name });

		setName("");
		setIcon("");
		toast.success(`${itemName} criado(a)!`);
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
		<ModalSmallForm>
			<div className="form-top-container">

				<ModalSmallFormLabel>
					<strong>Icone</strong>
					<input
						type="text"
						placeholder="Icone"
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="name"
					/>
				</ModalSmallFormLabel>
				<ModalSmallFormLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder={`Nome do(a) ${itemName}`}
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="price"
					/>
				</ModalSmallFormLabel>
			</div>

			<ModalSmallFormButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleCreate(e)}>
					Criar {itemName}
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</ModalSmallFormButtonsContainer>
		</ModalSmallForm>
	);
}
