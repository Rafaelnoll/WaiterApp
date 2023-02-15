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
	id: string;
	onSelectProduct: (id: string) => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function ProductCard({
	imagePath,
	name,
	price,
	id,
	onSelectProduct,
	onEdit,
	onDelete
}: ProductCardProps) {

	function handleEditProduct() {
		onSelectProduct(id);
		onEdit();
	}

	function handleDeleteProduct() {
		onSelectProduct(id);
		onDelete();
	}

	return (
		<ProductCardTr>
			<td>
				<ProductCardImage src={`http://localhost:3001/uploads/${imagePath}`} />
			</td>
			<td>{name}</td>
			<td>{formatCurrency(price)}</td>
			<td>
				<ProductCardActions>
					<button onClick={handleEditProduct}><img src={EditIcon} /></button>
					<button onClick={handleDeleteProduct}><img src={DeleteIcon} /></button>
				</ProductCardActions>
			</td>
		</ProductCardTr>
	);
}
