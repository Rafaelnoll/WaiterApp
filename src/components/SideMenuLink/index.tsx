import React from "react";
import { Link } from "react-router-dom";
import { SideMenuLinkContent } from "./styles";
import LinkArrow from "../../assets/images/menu-link-arrow.svg";

interface SideMenuLinkProps {
	to: string,
	icon: string,
	title: string
}

export function SideMenuLink({ to, icon, title }: SideMenuLinkProps) {
	return (
		<Link to={to}>
			<SideMenuLinkContent>
				<img src={icon} />
				<strong>{title}</strong>
				<img src={LinkArrow} />
			</SideMenuLinkContent>
		</Link>
	);
}
