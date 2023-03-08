import React from "react";
import { Link } from "react-router-dom";
import { NavbarContainer } from "./styles";

export function Navbar() {
	return (
		<NavbarContainer>
			<Link to='/' className="link">Pedidos</Link>
			<Link to='/maneger' className="link">Produtos</Link>
		</NavbarContainer>
	);
}
