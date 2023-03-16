import React from "react";
import {
	TableCardTr,
	TableCardImage,
	TableCardActions,
} from "./styles";
import DetailsIcon from "../../assets/images/details-icon.svg";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import { formatCurrency } from "../../utils/formatCurrency";

interface TableCardProps {
	imagePath?: string;
	name?: string;
	icon?: string;
	price?: number;
	id: string;
	onSelectItem: (id: string) => void;
	onEdit: () => void;
	onDelete: () => void;
	onSeeDetails: () => void;
	showButtonDetails?: boolean;
}

export function TableCard({
	imagePath,
	name,
	price,
	icon,
	id,
	onSelectItem,
	onDelete,
	onEdit,
	onSeeDetails,
	showButtonDetails = false,
}: TableCardProps) {

	function handleSeeItemDetails() {
		onSelectItem(id);
		onSeeDetails();
	}

	function handleEditItem() {
		onSelectItem(id);
		onEdit();
	}

	function handleDeleteItem() {
		onSelectItem(id);
		onDelete();
	}

	return (
		<TableCardTr>
			{imagePath && <td><TableCardImage src={`http://localhost:3001/uploads/${imagePath}`} /></td>}
			{icon && <td>{icon}</td>}
			{name && <td>{name}</td>}
			{price && <td>{formatCurrency(price)}</td>}
			<td>
				<TableCardActions>
					{showButtonDetails && <button onClick={handleSeeItemDetails}><img src={DetailsIcon} /></button>}
					<button onClick={handleEditItem}><img src={EditIcon} /></button>
					<button onClick={handleDeleteItem}><img src={DeleteIcon} /></button>
				</TableCardActions>
			</td>
		</TableCardTr>
	);
}
