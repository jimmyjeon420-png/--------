import { getProduct, getProducts } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Analytics from '@/components/features/Analytics';
import { ProductActions } from '@/components/commerce/ProductActions';

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <Analytics />
            <div className="grid md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden bg-secondary rounded-lg">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, i) => (
                            <div key={i} className="relative aspect-square bg-secondary rounded overflow-hidden cursor-pointer border hover:border-primary">
                                <Image src={img} alt="" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
                        <p className="text-2xl font-medium">
                            {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: product.currency }).format(product.price)}
                        </p>
                    </div>

                    <div className="prose prose-sm text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    <div className="border-t border-b py-4 space-y-2">
                        <h3 className="font-medium">Features</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {product.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <ProductActions product={product} />
                </div>
            </div>

            {/* Reviews & Q&A Stub */}
            <div className="mt-24">
                <h2 className="text-2xl font-serif mb-8 text-center">Reviews & Q&A</h2>
                <div className="text-center text-muted-foreground py-12 border rounded-lg bg-secondary/20">
                    Reviews module loading...
                </div>
            </div>
        </div>
    );
}
