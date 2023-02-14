import React from "react";
import {
	ProductModalContainer,
	ProductModalContent,
	ProductModalHeader,
} from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";
import { ProductFormEdit } from "../ProductFormEdit";

interface ProductModalEditProps {
	onCloseModal: () => void;
	productId: string;
}

export function ProductModalEdit({ onCloseModal, productId }: ProductModalEditProps) {
	return (
		<ProductModalContainer>
			<ProductModalContent>
				<ProductModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
					<strong>
						Editar Produto
					</strong>
				</ProductModalHeader>
				<ProductFormEdit onCloseModal={onCloseModal} productId={productId} />
			</ProductModalContent>
		</ProductModalContainer>
	);
}
