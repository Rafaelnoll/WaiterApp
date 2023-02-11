import React from "react";
import {
	ProductModalContainer,
	ProductModalContent,
	ProductModalHeader,
} from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";
import { ProductForm } from "../ProductForm";

interface ProductModalProps {
	onCloseModal: () => void;
}

export function ProductModal({ onCloseModal }: ProductModalProps) {
	return (
		<ProductModalContainer>
			<ProductModalContent>
				<ProductModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
					<strong>
						Criar Produto
					</strong>
				</ProductModalHeader>
				<ProductForm onCloseModal={onCloseModal}/>
			</ProductModalContent>
		</ProductModalContainer>
	);
}
