import styled from "styled-components";

export const NavbarContainer = styled.div`
	display:flex;
	justify-content:end;
	align-items:center;
	gap: 12px;
	padding: 16px 32px;

	.link{
		text-decoration:none;
		color: #fff;
		background-color:#D73035;
		padding: 8px 16px;
		border-radius:4px;
	}

	.link:hover{
		background-color:#c73035;
	}
`;

