import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
	max-width: 500px;
	margin: 0 auto;
`;

export const ProductDetailsImage = styled.img`
	width:100%;
	border-radius:8px;
	margin-bottom: 32px;
`;

export const ProductDetailsBody = styled.div`
	display:flex;
	flex-direction:column;

	header{
		margin-bottom:32px;
	}
`;

export const ProductDetailsTitle = styled.strong`
	font-weight: 600;
	font-size: 24px;
	color: #333;
	margin-bottom: 8px;
`;

export const ProductDetailsDescription = styled.p`
	font-size: 16px;;
	font-weight:400;
	color: #666;
`;

export const ProductDetailsIngredientsContainer = styled.div`

`;

export const ProductDetailsIngredientsTitle = styled.strong`
	font-size: 16px;
	font-weight: 600;
	color: #666;
`;

export const IngredientsList = styled.div`
	display:flex;
	flex-direction:column;
	margin-top:16px;
	gap:4px;
`;

export const Ingredient = styled.div`
	display:flex;
	gap:20px;
	width:100%;
	padding: 16px;
	border: 1px solid rgba(204, 204, 204, 0.3);
	border-radius: 8px;
`;
