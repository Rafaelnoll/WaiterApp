import React from "react";
import {
	CategoryCardActions,
	CategoryCardTr
} from "./styles";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

interface ProductCardProps {
	icon: string;
	name: string;
	id: string;
	onSelectCategory: (id: string) => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function CategoryCard({
	icon,
	name,
	id,
	onSelectCategory,
	onEdit,
	onDelete
}: ProductCardProps) {

	function handleEditCategory() {
		onSelectCategory(id);
		onEdit();
	}

	function handleDeleteCategory() {
		onSelectCategory(id);
		onDelete();
	}

	return (
		<CategoryCardTr>
			<td>{icon}</td>
			<td>{name}</td>
			<td>
				<CategoryCardActions>
					<button onClick={handleEditCategory}><img src={EditIcon} /></button>
					<button onClick={handleDeleteCategory}><img src={DeleteIcon} /></button>
				</CategoryCardActions>
			</td>
		</CategoryCardTr>
	);
}
