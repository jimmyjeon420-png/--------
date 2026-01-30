import { getProducts } from '@/lib/products';
import { ProductList } from '@/components/commerce/ProductList';

export const metadata = {
    title: 'Products | EMS Beauty',
    description: 'Explore our collection of premium EMS devices and cosmetics.',
};

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-serif text-center mb-12">Collection</h1>
            <ProductList products={products} />
        </div>
    );
}
