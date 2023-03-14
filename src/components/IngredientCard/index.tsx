import React from "react";
import {
	IngredientCardActions,
	IngredientCardTr
} from "./styles";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

interface IngredientCardProps {
	icon: string;
	name: string;
	id: string;
	onSelectIngredient: (id: string) => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function IngredientCard({
	icon,
	name,
	id,
	onSelectIngredient,
	onEdit,
	onDelete
}: IngredientCardProps) {

	function handleEditIngredient() {
		onSelectIngredient(id);
		onEdit();
	}

	function handleDeleteIngredient() {
		onSelectIngredient(id);
		onDelete();
	}

	return (
		<IngredientCardTr>
			<td>{icon}</td>
			<td>{name}</td>
			<td>
				<IngredientCardActions>
					<button onClick={handleEditIngredient}><img src={EditIcon} /></button>
					<button onClick={handleDeleteIngredient}><img src={DeleteIcon} /></button>
				</IngredientCardActions>
			</td>
		</IngredientCardTr>
	);
}
