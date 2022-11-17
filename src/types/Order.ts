export interface Order {
	_id: string,
	table: string,
	status: "WAITING" | "IN_PRODUCTION" | "DONE",
	products: {
		product: {
			name: string,
			imagePath: string,
			price: number,
		},
		quantity: number,
		_id: string,
	}[],
}
