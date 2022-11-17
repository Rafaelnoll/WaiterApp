import React, { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { BoardContainer, OrderContainer } from "./styles";

interface OrdersBoardPorps {
	icon: string,
	title: string,
	orders: Order[],
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardPorps) {

	const [isModalVisible, setIsModalVisible] = useState(true);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	function handleOpenModal(order: Order) {
		setIsModalVisible(!isModalVisible);
		setSelectedOrder(order);
	}

	function handleCloseModal() {
		setIsModalVisible(false);
		setSelectedOrder(null);
	}

	return (
		<BoardContainer>
			<OrderModal visible={isModalVisible} order={selectedOrder} onClose={handleCloseModal} />
			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>
			{orders.length > 0 && (
				<OrderContainer>
					{orders.map(order => {
						return (
							<button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
								<strong>Mesa {order.table}</strong>
								<span>{order.products.length} itens</span>
							</button>
						);
					})}
				</OrderContainer>
			)}
		</BoardContainer>
	);
}
