import React from "react";
import {
	ProductCardActions,
	ProductCardImage,
	ProductCardTr
} from "./styles";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductCardProps {
	imagePath: string;
	name: string;
	price: number;
}

export function ProductCard({ imagePath, name, price }: ProductCardProps) {
	return (
		<ProductCardTr>
			<td>
				<ProductCardImage src={`http://localhost:3001/uploads/${imagePath}`} />
			</td>
			<td>{name}</td>
			<td>{formatCurrency(price)}</td>
			<td>
				<ProductCardActions>
					<button><img src={EditIcon} /></button>
					<button><img src={DeleteIcon} /></button>
				</ProductCardActions>
			</td>
		</ProductCardTr>
	);
}
