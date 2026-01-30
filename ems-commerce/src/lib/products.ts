import { promises as fs } from 'fs';
import path from 'path';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    category: string;
    stock: number;
    features: string[];
}

const dataDirectory = path.join(process.cwd(), 'src/lib/data');

export async function getProducts(): Promise<Product[]> {
    const filePath = path.join(dataDirectory, 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getProduct(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((product) => product.id === id);
}
