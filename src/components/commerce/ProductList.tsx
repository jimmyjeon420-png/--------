import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
