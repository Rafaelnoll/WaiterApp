import styled from "styled-components";

export const ModalDeleteContainer = styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	gap:16px;

	strong{
		font-size: 24px;
		color: #333;
	}

	img{
		width:120px;
	}

	p{
		font-size:16px;
		max-width:400px;
		color: #666;
		margin-bottom:16px;
		text-align:center;
	}

	.action-buttons{
		display:flex;
		gap: 16px;

		button{
			font-size:20px;
			padding:8px 16px;
			width: 100px;
			border:none;
			border-radius:4px;
		}

		.button-delete{
			background-color:#D73035;
			color:#fff;
		}

		.button-cancel{
			background-color:#F2F4F6;
		}

	}
`;

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

