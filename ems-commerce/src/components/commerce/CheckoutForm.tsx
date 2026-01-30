'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { requestPayment } from '@/lib/payment';
import { motion, AnimatePresence } from 'framer-motion';

export function CheckoutForm() {
    const [isExpanded, setIsExpanded] = useState(false);

    // Dummy handle for demo
    const handlePayment = async () => {
        try {
            const response = await requestPayment({
                storeId: "store-id-placeholder",
                paymentId: `order-${Date.now()}`,
                orderName: "EMS Mini Pad (3ea)",
                totalAmount: 25000,
                currency: "KRW",
                payMethod: "CARD"
            });
            console.log("Payment response", response);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold mb-4">Express Checkout</h3>

            <div className="space-y-4">
                <Button
                    size="lg"
                    className="w-full bg-[#FAE100] text-[#371D1E] hover:bg-[#F7E600] font-bold"
                    onClick={() => console.log("Kakao Pay Clicked")}
                >
                    Kakao Pay
                </Button>

                <Button
                    size="lg"
                    className="w-full bg-[#03C75A] text-white hover:bg-[#02B351] font-bold"
                    onClick={() => console.log("Naver Pay Clicked")}
                >
                    Naver Pay
                </Button>
            </div>

            <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                <div className="relative z-10 bg-white px-2 text-xs text-muted-foreground uppercase">Or pay with card</div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                Enter Delivery Details
            </Button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 pt-4">
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Full Name" />
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Phone Number" />
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Address" />
                            <Button className="w-full mt-2" size="lg" onClick={handlePayment}>
                                Pay 25,000 KRW
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
