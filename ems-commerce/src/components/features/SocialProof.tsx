'use client';

import { motion } from 'framer-motion';

export function SocialProof() {
    return (
        <div className="bg-neutral-50 py-24 md:py-32 overflow-hidden">
            <div className="container">

                {/* Clinical Data Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="text-[#E30211] font-bold tracking-widest text-xs uppercase">Clinical Test Results</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                        Visible Change in 2 Weeks
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        Experience the scientifically proven lifting effect.
                        Skin elasticity improved by <span className="text-black font-bold">14.2%</span> after consistent use.
                    </p>
                </div>

                {/* Graph Section */}
                <div className="flex flex-col md:flex-row gap-12 items-end justify-center mb-24 max-w-4xl mx-auto">
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-sm shadow-sm border border-neutral-100">
                        <h3 className="text-lg font-bold mb-6">Skin Elasticity (%)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-neutral-500">Before</span>
                                <div className="flex-1 bg-neutral-100 h-8 rounded-sm overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "60%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-neutral-300"
                                    />
                                </div>
                                <span className="w-12 text-sm font-bold">100</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-neutral-500">After 2 Weeks</span>
                                <div className="flex-1 bg-neutral-100 h-8 rounded-sm overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "85%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                        className="h-full bg-[#E30211]"
                                    />
                                </div>
                                <span className="w-12 text-sm font-bold text-[#E30211]">114.2</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-6 text-center">
                            * Korea Institute of Dermatological Sciences / 2024.01.20 - 02.04 / N=24
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <div className="flex gap-8 justify-center md:justify-start">
                            <div>
                                <div className="text-4xl font-bold text-[#E30211] mb-1">98%</div>
                                <div className="text-sm text-neutral-500">Satisfaction</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#E30211] mb-1">95%</div>
                                <div className="text-sm text-neutral-500">Repurchase</div>
                            </div>
                        </div>
                        <p className="text-neutral-800 leading-relaxed font-medium">
                            "I was skeptical because of the price, but the effect is real.
                            It feels just like the expensive device I used to have."
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <div className="flex text-[#E30211]">★★★★★</div>
                            <span className="text-sm font-bold">Verified Buyer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
