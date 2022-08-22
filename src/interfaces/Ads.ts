export interface AdsCard {
    brand: string;
    price: number;
    year: number;
    description: string;
    km: number;
    model: string;
    state: string;
    transmision: string;
    userId: string;
    images: Array<string>;
}

export interface searchParams {
    brand: string;
    type: string;
    minPrice: string;
    maxPrice: string;
}