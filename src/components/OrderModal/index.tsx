import React, { useEffect } from "react";
import { ModalBody, OrderActions, OrderDetails, OverLay } from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
	onCancelOrder: () => void;
	isLoading: boolean;
}

export function OrderModal({
	visible,
	order,
	onClose,
	onCancelOrder,
	isLoading
}: OrderModalProps) {

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	if (!visible || !order) {
		return null;
	}

	const total = order.products.reduce((total, { quantity, product }) => {
		return total + (product.price * quantity);
	}, 0);

	return (
		<OverLay>
			<ModalBody>
				<header>
					<strong>Mesa {order.table}</strong>
					<button type="button" onClick={onClose}>
						<img src={CloseIcon} alt="Botão para fechar o modal" />
					</button>
				</header>

				<div className="status-container">
					<small>Status do pedido</small>
					<div>
						<span>
							{order.status === "WAITING" && "🕒"}
							{order.status === "IN_PRODUCTION" && "👩‍🍳"}
							{order.status === "DONE" && "✅"}
						</span>
						<strong>
							{order.status === "WAITING" && "Fila de Espera"}
							{order.status === "IN_PRODUCTION" && "Em Produção"}
							{order.status === "DONE" && "Concluído"}
						</strong>
					</div>

				</div>

				<OrderDetails>
					<strong>Itens</strong>

					<div className="order-itens">
						{order.products.map(({ _id, product, quantity }) => {
							return (
								<div className="item" key={_id}>
									<img
										src={`http://localhost:3001/uploads/${product.imagePath}`}
										alt={`Imagem ${product.name}`}
										width="56"
										height={28.51}
									/>

									<span className="quantity">{quantity}x</span>

									<div className="product-details">
										<strong>{product.name}</strong>
										<span>{formatCurrency(product.price)}</span>
									</div>
								</div>
							);
						})}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</OrderDetails>
				<OrderActions>
					<button
						type="button"
						className="primary"
						disabled={isLoading}
					>
						<span>
							{order.status === "WAITING" && "👩‍🍳"}
							{order.status === "IN_PRODUCTION" && "✅"}
						</span>
						<strong>
							{order.status === "WAITING" && "Iniciar Produção"}
							{order.status === "IN_PRODUCTION" && "Concluir Pedido"}
						</strong>
					</button>
					<button
						type="button"
						className="secondary"
						onClick={onCancelOrder}
						disabled={isLoading}
					>
						Cancelar Pedido
					</button>
				</OrderActions>
			</ModalBody>
		</OverLay>
	);
}
