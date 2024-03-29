import styled from "styled-components";

export const TableCardTr = styled.tr`
	background-color:red;
	text-align:center;
	background: #FFFFFF;
	box-shadow: 0px 2px 16px rgba(153, 155, 168, 0.12);
	border-radius: 4px;

	th,td{
		padding:16px;
		font-weight: 400;
		font-size: 18px;
	}
`;

export const TableCardImage = styled.img`
	max-width:120px;
	max-height: 60px;
	border-radius:8px;
`;

export const TableCardActions = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	gap:16px;

	button{
		background: transparent;
		border:none;
	}
`;
