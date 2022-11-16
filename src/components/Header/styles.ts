import styled from "styled-components";

export const HeaderContainer = styled.header`
	background-color: #D73035;
	display:flex;
	justify-content:center;
	align-items:center;
	height:198px;
`;

export const Content = styled.div`
	width:100%;
	max-width: 1215px;
	display:flex;
	align-items:center;
	justify-content:space-between;

	.page-details{
		h1{
			font-size:32px;
			color: #fff;
			margin-bottom:6px;
		}

		h2{
			font-size:16px;
			font-weight:400;
			color: #fff;
			opacity:0.9;
		}
	}
`;
