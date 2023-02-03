import React, { useState } from "react";
import { toast } from "react-toastify";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrderModal } from "../OrderModal";
import { BoardContainer, OrderContainer } from "./styles";

interface OrdersBoardPorps {
	icon: string,
	title: string,
	orders: Order[],
	onCancelOrder: (orderId: string) => void;
	onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardPorps) {
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	function handleOpenModal(order: Order) {
		setSelectedOrder(order);
		setIsModalVisible(true);
	}

	function handleCloseModal() {
		setIsModalVisible(false);
		setSelectedOrder(null);
	}

	async function handleChangeOrderStatus() {
		if (!selectedOrder) return;
		setIsLoading(true);
		const status = selectedOrder.status === "WAITING"
			? "IN_PRODUCTION"
			: "DONE";

		await api.patch(`/orders/${selectedOrder._id}`, { status });
		toast.success(`O pedido da mesa ${selectedOrder.table} teve o status alterado!`);
		onChangeOrderStatus(selectedOrder._id, status);
		setIsLoading(false);
		setIsModalVisible(false);
	}

	async function handleCancelOrder() {
		if (!selectedOrder) return;
		setIsLoading(true);

		await api.delete(`/orders/${selectedOrder._id}`);

		toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
		onCancelOrder(selectedOrder._id);
		setIsLoading(false);
		setIsModalVisible(false);
	}

	return (
		<BoardContainer>
			<OrderModal
				visible={isModalVisible}
				order={selectedOrder}
				isLoading={isLoading}
				onClose={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>
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
