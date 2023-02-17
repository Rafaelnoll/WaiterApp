import React, { ReactNode } from "react";
import {
	ProductModalContainer,
	ProductModalContent,
	ProductModalHeader,
} from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";

interface ProductModalProps {
	onCloseModal: () => void;
	title?: string;
	children?: ReactNode
}

export function ProductModal({ onCloseModal, title, children }: ProductModalProps) {
	return (
		<ProductModalContainer>
			<ProductModalContent>
				<ProductModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
					<strong>
						{title}
					</strong>
				</ProductModalHeader>
				{children}
			</ProductModalContent>
		</ProductModalContainer>
	);
}
