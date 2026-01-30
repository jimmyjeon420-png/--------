'use client';

import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/products">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 py-6 border-b">
                            <div className="relative w-24 h-24 bg-secondary rounded overflow-hidden">
                                {item.images[0] && (
                                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-serif text-lg">{item.name}</h3>
                                <p className="text-muted-foreground text-sm mb-2">{item.category}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                    </div>
                                    <p className="font-medium">
                                        {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: item.currency }).format(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeItem(item.id)}>
                                X
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="bg-secondary/10 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-serif mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total())}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>
                    <div className="border-t pt-4 mb-6 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(total())}</span>
                    </div>
                    <Link href="/checkout">
                        <Button className="w-full" size="lg">Proceed to Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
