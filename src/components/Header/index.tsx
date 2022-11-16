import React from "react";
import { HeaderContainer, Content } from "./styles";
import Logo from "../../assets/images/logo.svg";

export function Header() {
	return (
		<HeaderContainer>
			<Content>
				<div className="page-details">
					<h1>Pedidos</h1>
					<h2>Acompanhe os pedidos dos clientes</h2>
				</div>

				<img src={Logo} alt="WaiterApp logo" />
			</Content>
		</HeaderContainer>
	);
}
