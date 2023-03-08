import React, { ReactNode } from "react";
import {
	ModalContainer,
	ModalContent,
	ModalHeader,
} from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";

interface ModalProps {
	onCloseModal: () => void;
	title?: string;
	children?: ReactNode
}

export function Modal({ onCloseModal, title, children }: ModalProps) {
	return (
		<ModalContainer>
			<ModalContent>
				<ModalHeader>
					<button onClick={onCloseModal}>
						<img src={CloseIcon} />
					</button>
					<strong>
						{title}
					</strong>
				</ModalHeader>
				{children}
			</ModalContent>
		</ModalContainer>
	);
}
