'use client';

import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ProductActions({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={isAdded}>
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <Button size="lg" variant="outline">Buy Now</Button>
        </div>
    );
}
