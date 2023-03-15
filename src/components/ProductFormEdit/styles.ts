import styled from "styled-components";

export const ProductModalForm = styled.form`
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

export const ProductModalFormLabel = styled.div`
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

export const ProductModalFormSelector = styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	max-height:200px;

	span{
		text-align:end;
		font-weight: 500;
		font-size: 16px;
	}

	select{
		background: #FFFFFF;
		border: 1px solid #D1D1D1;
		border-radius: 4px;
		padding: 12px 8px;
		font-size:16px;
	}

	select[multiple]:focus option:checked {
  		background: #D73035 linear-gradient(0deg, #D73035 0%, #D73035 100%);
	}

	option{
		width:100%;
		padding: 8px 4px;
		border-radius:4px;
		margin: 4px;
	}

	option:checked{
		background-color:#D73035;
		color:#fff;
	}

`;

export const ProductModalFormTextAreaContainer = styled.div`
	display:flex;
	flex-direction:column;
	width:100%;

	span{
		text-align:end;
		font-weight: 500;
		font-size: 16px;
	}

	textarea{
		background: #FFFFFF;
		border: 1px solid #D1D1D1;
		border-radius: 4px;
		padding: 12px 8px;
		font-size:16px;
		min-width: 100%;
		max-width:100%;
		min-height: 100px;
		max-height: 200px;
	}
`;

export const ProductModalFormFileImageContainer = styled.div`
	display:flex;
	flex-direction:column;
	justify-content:end;

	span{
		text-align:end;
		font-weight: 500;
		font-size: 16px;
	}

	.file-selector{
		display:flex;
		align-items:center;

		label{
			background-color: #D73035;
			color: #fff;
			font-weight: 400;
			font-size: 16px;
			padding:8px;
			border-radius: 8px;
			cursor: pointer;
			margin-right:8px;
		}

		strong,span{
			font-size:14px;
		}

		strong{
			margin-right:4px;
		}

		span{
			flex:1;
			text-align:start;
		}

	}

	input#file-input{
		display:none;
	}
`;

export const ProductModalFormButtonsContainer = styled.div`
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
