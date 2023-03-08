import styled from "styled-components";

export const SideMenuContainer = styled.div`
`;

export const SideMenuIconButton = styled.button`
	cursor: pointer;
	background-color: transparent;
	border:none;
`;

export const SideMenuContent = styled.div`
	position:fixed;
	top:0;
	left:0;
	padding: 16px 32px;
	background-color: #D73035;
	height:100%;
	z-index:999;
	max-width:220px;
	width:100%;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	.close-icon{
		width:42px;
	}

`;

export const SideMenuLinksContainer = styled.div`
	display:flex;
	flex-direction:column;
	gap: 8px;
`;


