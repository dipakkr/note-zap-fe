const TrustedBy = () => {
    const brands = [
        { name: "Notion", logo: "https://img.icons8.com/color/96/notion--v1.png" },
        { name: "Figma", logo: "https://img.icons8.com/color/96/figma--v1.png" },
        { name: "Dropbox", logo: "https://img.icons8.com/color/96/dropbox.png" },
        { name: "Monday", logo: "https://img.icons8.com/color/96/monday.png" },
        { name: "Zoom", logo: "https://img.icons8.com/color/96/zoom.png" },
        { name: "Discord", logo: "https://img.icons8.com/color/96/discord-logo.png" },
        { name: "Canva", logo: "https://img.icons8.com/color/96/canva.png" },
        { name: "Spotify", logo: "https://img.icons8.com/color/96/spotify--v1.png" },
        { name: "GitHub", logo: "https://img.icons8.com/color/96/github--v1.png" },
        { name: "Shopify", logo: "https://img.icons8.com/color/96/shopify.png" },
        { name: "Google", logo: "https://img.icons8.com/color/96/google.png" },
        { name: "Paytm", logo: "https://img.icons8.com/color/96/paytm.png" },

    ];

    return (
        <section className="py-8 bg-gradient-to-b from-white to-gray-50/50 -mt-20 relative z-20">
            <div className="container-tight mb-4">
                <p className="text-center text-xs font-medium text-muted-foreground tracking-widest uppercase">
                    Trusted by teams at
                </p>
            </div>

            {/* Animated Scrolling Container */}
            <div className="relative overflow-hidden">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <div className="flex animate-scroll-brands hover:[animation-play-state:paused]">
                    {/* First set of brands */}
                    {brands.map((brand, index) => (
                        <div
                            key={`brand-1-${index}`}
                            className="flex items-center gap-2 mx-8 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-7 w-7 object-contain"
                            />
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {brands.map((brand, index) => (
                        <div
                            key={`brand-2-${index}`}
                            className="flex items-center gap-2 mx-8 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-7 w-7 object-contain"
                            />
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
