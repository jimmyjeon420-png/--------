'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckoutForm } from '@/components/commerce/CheckoutForm';
import bundlesData from '@/lib/data/bundles.json';
import { motion } from 'framer-motion';

// Mocking the loaded data for client component usage (in real app, pass as prop)
const bundles = bundlesData;

export function BundleSelector() {
    const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-3ea');

    const selectedBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

    return (
        <div className="max-w-lg mx-auto">
            <div className="grid gap-4 mb-8">
                {bundles.map((bundle) => {
                    const isSelected = selectedBundleId === bundle.id;
                    const discount = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

                    return (
                        <div
                            key={bundle.id}
                            onClick={() => setSelectedBundleId(bundle.id)}
                            className={cn(
                                "relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-black/50 bg-white",
                                isSelected ? "border-black bg-neutral-50" : "border-neutral-200"
                            )}
                        >
                            {isSelected && (
                                <motion.div layoutId="check" className="absolute -right-3 -top-3 bg-black text-white rounded-full p-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </motion.div>
                            )}

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-lg">{bundle.name.replace('EMS Mini Pad', '')}</span>
                                    {bundle.badges.map(badge => (
                                        <span key={badge} className="text-[10px] font-bold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full uppercase tracking-wide">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-muted-foreground">{bundle.description}</div>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-muted-foreground line-through">
                                    {new Intl.NumberFormat('ko-KR').format(bundle.originalPrice)}
                                </div>
                                <div className="flex items-center justify-end gap-2 text-xl font-bold">
                                    <span className="text-red-500 text-sm">-{discount}%</span>
                                    {new Intl.NumberFormat('ko-KR').format(bundle.price)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Product</span>
                    <span>{selectedBundle.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{selectedBundle.shipping === 0 ? 'Free' : new Intl.NumberFormat('ko-KR').format(selectedBundle.shipping)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-end">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-black">
                        {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(selectedBundle.price + (selectedBundle.shipping || 0))}
                    </span>
                </div>


                <CheckoutForm />
            </div>
        </div>
    );
}
