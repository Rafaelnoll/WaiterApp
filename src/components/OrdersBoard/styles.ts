import styled from "styled-components";

export const BoardContainer = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	flex:1;
	padding:16px;
	border: 1px solid rgba(204,204,204,0.4);
	border-radius:16px;

	> header{
		padding:8px;
		display:flex;
		justify-content:center;
		align-items:center;
		gap:8px;
		font-size:14px;
	}
`;

export const OrderContainer = styled.div`
	display:flex;
	flex-direction:column;
	gap:8px;
	width:100%;
	margin-top:24px;

	button{
		width:100%;
		background-color:#FFF;
		border: 1px solid rgba(204,204,204,0.4);
		height:128px;
		border-radius:8px;
		display:flex;
		flex-direction:column;
		align-items:center;
		justify-content:center;
		gap:4px;

		strong{
			font-weight:500;
			color:#333;
			font-size:16px;
		}

		span{
			font-weight:400;
			color:#666;
			font-size:14px;
		}

		& + button{
			margin-top:24px;
		}
	}
`;
