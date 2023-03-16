export interface Product {
	_id: string,
	name: string,
	description: string,
	imagePath: string,
	price: number,
	category:string;
	ingredients: Array<{
		name: string,
		icon: string,
		_id: string,
	}>
}
