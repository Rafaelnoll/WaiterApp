import styled from "styled-components";

export const ProductsTableContainer = styled.div`
	width:100%;
	max-width: 1215px;
 	padding:0 16px;
 	margin:32px auto;
`;

export const ProductsTableActions = styled.div`
	width: 100%;
	padding:0 16px;
	margin-bottom:32px;
	display:flex;
	justify-content:end;
	align-items: center;

	button{
		display:flex;
		justify-content:center;
		align-items:center;
		gap:10px;
		color:#666;
		font-weight: 700;
		font-size: 14px;
		padding:4px;
		background:transparent;
		border:none;
	}
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


