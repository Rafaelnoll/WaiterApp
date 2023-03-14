import styled from "styled-components";

export const ModalSmallFormEdit = styled.form`
	.form-top-container{
		display:flex;
		gap:16px;
	}

	.form-main-container{
		display:flex;
		flex-direction:column;
		gap:16px;
		margin-top:16px;
	}

	.form-bottom-container{
		display:flex;
		align-items:center;
	}
`;

export const ModalSmallFormEditLabel = styled.div`
	display:flex;
	flex-direction:column;
	width:100%;

	strong{
		text-align:end;
		font-weight: 500;
		font-size: 16px;
	}

	input{
		background: #FFFFFF;
		border: 1px solid #D1D1D1;
		border-radius: 4px;
		padding: 12px 8px;
		font-size:16px;
	}
`;

export const ModalSmallFormEditButtonsContainer = styled.div`
	display:flex;
	flex-direction:column;
	gap:12px;
	margin-top:16px;

	button{
		font-size:16px;
		font-weight: 500;
		padding: 8px;
		border-radius:4px;
		border:none;
	}

	.button-create{
		background-color:#D73035;
		color:#fff;
	}

	.button-create:disabled{
		background-color:#999;
		cursor: not-allowed;
	}

	.button-cancel{
		background-color:#F2F4F6;
	}
`;
