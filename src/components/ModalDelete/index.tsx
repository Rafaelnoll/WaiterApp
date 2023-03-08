import React from "react";
import CloseIcon from "../../assets/images/close-icon.svg";
import CancelIcon from "../../assets/images/cancel-icon.svg";
import {
	ModalDeleteContainer,
	ModalContainer,
	ModalContent,
	ModalHeader
} from "./styles";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

interface ModalDeleteProps {
	onCloseModal: () => void;
	itemId: string;
	path: string;
	itemName?: string;
}

export function ModalDelete({ onCloseModal, itemId, path, itemName }: ModalDeleteProps) {

	async function handleDeleteItem() {
		await api.delete(`${path}/${itemId}`);
		toast.success(`${itemName} deletado(a)`);
		onCloseModal();
	}

	return (
		<ModalContainer>
			<ModalContent>
				<ModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
				</ModalHeader>
				<ModalDeleteContainer>
					<img src={CancelIcon} />
					<strong>Você tem certeza?</strong>
					<p>Você realmente deseja excluir este(a) {itemName ? itemName : "Item"}? Este processo não pode ser desfeito.</p>
					<div className="action-buttons">
						<button className="button-cancel" onClick={onCloseModal}>Cancelar</button>
						<button className="button-delete" onClick={handleDeleteItem}>Deletar</button>
					</div>
				</ModalDeleteContainer>
			</ModalContent>
		</ModalContainer>
	);
}

