import styled from "styled-components";

export const ModalContainer = styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:rgba(0,0,0,0.6);
	display:flex;
	justify-content:center;
	align-items:center;
`;

export const ModalContent = styled.div`
	width:100%;
	max-width: 600px;
	background: #F8FAFB;
	border-radius: 8px;
	padding: 24px;
`;

export const ModalHeader = styled.header`
	display:flex;
	justify-content:space-between;
	align-items:center;
	margin-bottom:16px;

	button{
		display:flex;
		padding:4px;
		background:transparent;
		border:none;
	}
`;
