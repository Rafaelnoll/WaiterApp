import styled from "styled-components";

export const ProductsTableContainer = styled.div`
	width:100%;
 	padding:0 16px;
 	margin:32px 0;
`;

export const ProductsTableContent = styled.table`
	width:100%;
	border-spacing: 16px;

	thead tr{
		color:#666;
		font-weight: 500;
		font-size: 16px;
	}
`;

export const ProductsTablePagination = styled.div`
	padding:0 16px;
	margin-top:24px;
	display:flex;
	align-items:center;
	gap:12px;

	span{
		color: #666;
		font-size: 16px;
	}

	button{
		display:flex;
		justify-content:center;
		align-items:center;
		gap:10px;
		color:#666;
		font-weight: 400;
		font-size: 16px;
		padding:4px;
		background:transparent;
		border:none;
	}
`;


