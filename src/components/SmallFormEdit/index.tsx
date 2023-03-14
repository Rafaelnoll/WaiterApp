import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../utils/api";
import {
	ModalSmallFormEdit,
	ModalSmallFormEditButtonsContainer,
	ModalSmallFormEditLabel,
} from "./styles";

interface SmallFormEditProps {
	onCloseModal: () => void;
	itemId: string;
	path: string;
	itemName:string;
}

interface ItemProps {
	name: string;
	icon: string;
}

export function SmallFormEdit({ onCloseModal, itemId, path, itemName }: SmallFormEditProps) {
	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		async function loadItemData() {
			const itemResponse = await api.get(`${path}/${itemId}`);

			const item: ItemProps = itemResponse.data;

			setName(item.name);
			setIcon(item.icon);
		}

		loadItemData();
	}, []);

	useEffect(() => {
		handleVerifyForm();
	});

	async function handleEditItem(e: MouseEvent) {
		e.preventDefault();
		if (!isFormValid) return;

		await api.patch(`${path}/${itemId}`, { name, icon });

		onCloseModal();
		toast.success(`${itemName} editado(a)`);
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
		<ModalSmallFormEdit>
			<div className="form-top-container">

				<ModalSmallFormEditLabel>
					<strong>Icone</strong>
					<input
						type="Text"
						placeholder="Icone..."
						onChange={(e) => setIcon(e.target.value)}
						value={icon}
						name="icon"
					/>
				</ModalSmallFormEditLabel>
				<ModalSmallFormEditLabel>
					<strong>Nome</strong>
					<input
						type="text"
						placeholder="Nome da categoria..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="name"
					/>
				</ModalSmallFormEditLabel>
			</div>

			<ModalSmallFormEditButtonsContainer>
				<button className="button-create" disabled={!isFormValid} onClick={(e) => handleEditItem(e)}>
					Editar Categoria
				</button>

				<button className="button-cancel" onClick={(e) => handleCancel(e)}>
					Cancelar
				</button>
			</ModalSmallFormEditButtonsContainer>
		</ModalSmallFormEdit>
	);
}
