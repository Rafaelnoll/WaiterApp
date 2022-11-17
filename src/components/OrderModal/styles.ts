import styled from "styled-components";

export const OverLay = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	position:fixed;
	top:0;
	left:0;
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,0.8);
	backdrop-filter: blur(4.8px);
`;

export const ModalBody = styled.div`
	background-color:#FFF;
	width:480px;
	border-radius:8px;
	padding:32px;

	header{
		display:flex;
		justify-content:space-between;
		align-items:center;

		strong{
			font-size:24px;
		}

		button{
			line-height:0;
			border:0;
			background:transparent;
		}
	}

	.status-container{
		margin: 32px 0;

		small{
			font-size:14px;
			opacity:0.8;
		}

		div{
			display:flex;
			gap:8px;
			margin-top:8px;
			font-size:16px;
		}
	}
`;

export const OrderDetails = styled.div`
	margin:32px 0;

	> strong{
		font-size:14px;
		font-weight:500;
		opacity:0.8;
	}

	.order-itens{
		margin-top: 16px;
		display:flex;
		flex-direction:column;
	}

	.item{
		display:flex;

		& + .item{
			margin-top:16px;
		}

		img{
			border-radius:6px;
		}

		.quantity{
			color: #666;
			font-size:14px;
			display:block;
			min-width:20px;
			margin-left:12px;
		}

		.product-details{
			margin-left:4px;

			strong{
				display:block;
				margin-bottom:4px;
			}

			span{
				font-size:14px;
				color: #666;
			}
		}
	}

	.total{
		display:flex;
		justify-content:space-between;
		align-items:center;
		margin-top:24px;

		span{
			font-size:14px;
			opacity:0.8;
		}

		strong{
			font-size:16px;
		}
	}

`;

export const OrderActions = styled.footer`
	margin-top:32px;
	display:flex;
	flex-direction:column;

	.primary{
		display:flex;
		justify-content:center;
		align-items:center;
		gap:8px;
		padding:12px 24px;
		border-radius:48px;
		background:#333;
		border:none;
		color: #fff;
		font-size:16px;
	}

	.secondary{
		background:transparent;
		padding:14px 24px;
		border-radius:48px;
		border:none;
		color: #D73035;
		font-size: 16px;
		margin-top:12px;
	}
`;
