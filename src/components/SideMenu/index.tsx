import React, { useState } from "react";
import {
	SideMenuContainer,
	SideMenuContent,
	SideMenuIconButton,
	SideMenuLinksContainer
} from "./styles";
import { SideMenuLink } from "../SideMenuLink";

import MenuIcon from "../../assets/images/menu-icon.svg";
import CloseIcon from "../../assets/images/menu-close-icon.svg";
import HomeIcon from "../../assets/images/home-icon.svg";
import ProductsIcon from "../../assets/images/menu-products-icon.svg";
import CategoriesIcon from "../../assets/images/menu-categories-icon.svg";


export function SideMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleOpenMenu() {
		setIsMenuOpen(true);
	}

	function handleCloseMenu() {
		setIsMenuOpen(false);
	}

	return (
		<SideMenuContainer>
			<SideMenuIconButton onClick={handleOpenMenu}>
				<img src={MenuIcon} />
			</SideMenuIconButton>
			{isMenuOpen && (
				<SideMenuContent>
					<SideMenuIconButton onClick={handleCloseMenu}>
						<img src={CloseIcon} className="close-icon" />
					</SideMenuIconButton>
					<SideMenuLinksContainer>
						<SideMenuLink
							to="/"
							icon={HomeIcon}
							title="Pedidos"
						/>
						<SideMenuLink
							to="/maneger"
							icon={ProductsIcon}
							title="Produtos"
						/>
						<SideMenuLink
							to="/categories"
							icon={CategoriesIcon}
							title="Categorias"
						/>
					</SideMenuLinksContainer>
				</SideMenuContent>
			)}
		</SideMenuContainer>
	);
}
