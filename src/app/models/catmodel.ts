export interface CatImage{
    id: string;
    width?: number;
    height?: number;    
    url: string;
}

export interface CatApiResponse {
    id: string;
    name: string;
    origin: string;
    life_span: string;
    description: string;
    image?: CatImage;
    reference_image_id?: string;
}