import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { OrdersBoard } from "../OrdersBoard";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";

export function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		api.get("/orders")
			.then(({ data }) => {
				setOrders(data);
			});
	}, []);

	const waitingOrders = orders.filter((order) => order.status === "WAITING");
	const inProductionOrders = orders.filter((order) => order.status === "IN_PRODUCTION");
	const doneOrders = orders.filter((order) => order.status === "DONE");

	return (
		<Container>
			<OrdersBoard icon="🕒" title="Fila de espera" orders={waitingOrders} />
			<OrdersBoard icon="👩‍🍳" title="Em produção" orders={inProductionOrders} />
			<OrdersBoard icon="✅" title="Pronto!" orders={doneOrders} />
		</Container>
	);
}
