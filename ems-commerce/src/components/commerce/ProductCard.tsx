import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className="group block">
            <div className="relative aspect-square overflow-hidden bg-secondary">
                {product.images[0] && (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                {!product.images[0] && (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <div className="mt-4 space-y-1">
                <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>
                <p className="font-medium text-foreground mt-2">
                    {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: product.currency }).format(product.price)}
                </p>
            </div>
        </Link>
    );
}
