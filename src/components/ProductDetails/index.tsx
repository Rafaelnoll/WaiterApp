import React from "react";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Ingredient, IngredientsList, ProductDetailsBody, ProductDetailsContainer, ProductDetailsDescription, ProductDetailsImage, ProductDetailsIngredientsContainer, ProductDetailsIngredientsTitle, ProductDetailsTitle } from "./styles";

interface ProductDetailsProps {
	product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
	if (!product) return null;

	return (
		<ProductDetailsContainer>
			<ProductDetailsImage src={`http://localhost:3001/uploads/${product?.imagePath}`} />
			<ProductDetailsBody>
				<header>
					<ProductDetailsTitle>{product.name} - {formatCurrency(product.price)}</ProductDetailsTitle>
					<ProductDetailsDescription>{product.description}</ProductDetailsDescription>
				</header>
				{product.ingredients?.length > 0 && (
					<ProductDetailsIngredientsContainer>
						<ProductDetailsIngredientsTitle>Ingredientes</ProductDetailsIngredientsTitle>
						<IngredientsList>
							{product.ingredients.map((ingredient) => (
								<Ingredient key={ingredient._id}>
									<strong>{ingredient.icon}</strong>
									<span>{ingredient.name}</span>
								</Ingredient>
							))}
						</IngredientsList>
					</ProductDetailsIngredientsContainer>
				)}
			</ProductDetailsBody>
		</ProductDetailsContainer>
	);
}
