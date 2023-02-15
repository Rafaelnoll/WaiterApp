import React from "react";
import CloseIcon from "../../assets/images/close-icon.svg";
import CancelIcon from "../../assets/images/cancel-icon.svg";
import {
	ModalDeleteContainer,
	ProductModalContainer,
	ProductModalContent,
	ProductModalHeader
} from "./styles";
import { api } from "../../utils/api";

interface ModalDeleteProps {
	onCloseModal: () => void;
	productId: string;
}

export function ModalDelete({ onCloseModal, productId }: ModalDeleteProps) {

	async function handleDeleteProduct() {
		await api.delete(`/products/${productId}`);
	}

	return (
		<ProductModalContainer>
			<ProductModalContent>
				<ProductModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
				</ProductModalHeader>
				<ModalDeleteContainer>
					<img src={CancelIcon} />
					<strong>Você tem certeza?</strong>
					<p>Você realmente deseja excluir este produto? Este processo não pode ser desfeito.</p>
					<div className="action-buttons">
						<button className="button-cancel" onClick={onCloseModal}>Cancel</button>
						<button className="button-delete" onClick={handleDeleteProduct}>Delete</button>
					</div>
				</ModalDeleteContainer>
			</ProductModalContent>
		</ProductModalContainer>
	);
}

