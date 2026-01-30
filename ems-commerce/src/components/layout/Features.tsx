export function Features() {
    return (
        <section className="container py-24 space-y-24">
            <FeatureItem
                title="Instant Relief"
                description="Just 15 minutes a day. Relieve stress and tension instantly with our advanced EMS technology."
                align="left"
            />
            <FeatureItem
                title="Wireless & Portable"
                description="No cables, no hassle. Use it at work, at home, or on the go."
                align="right"
            />
            <FeatureItem
                title="5 Modes, 10 Intensities"
                description="Customized massage experience tailored to your body's needs."
                align="left"
            />
        </section>
    );
}

function FeatureItem({ title, description, align }: { title: string, description: string, align: 'left' | 'right' }) {
    return (
        <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 aspect-video w-full bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
                <span>Feature GIF / Image</span>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
