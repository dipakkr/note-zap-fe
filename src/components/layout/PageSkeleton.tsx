import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

/**
 * Skeleton loading component that shows real header, footer, and animated content placeholders
 * to provide a better perceived loading experience instead of a blank spinner screen.
 */

// Content skeleton variants for different page types
const HeroSkeleton = () => (
    <section className="py-20 md:py-28">
        <div className="container-tight">
            <div className="flex flex-col items-center text-center gap-6">
                {/* Badge */}
                <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />

                {/* Heading */}
                <div className="space-y-3 w-full max-w-2xl">
                    <div className="h-10 md:h-14 w-full animate-pulse rounded bg-muted" />
                    <div className="h-10 md:h-14 w-3/4 mx-auto animate-pulse rounded bg-muted" />
                </div>

                {/* Subheading */}
                <div className="space-y-2 w-full max-w-xl">
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-2/3 mx-auto animate-pulse rounded bg-muted" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="h-12 w-40 animate-pulse rounded-full bg-primary/30" />
                    <div className="h-12 w-32 animate-pulse rounded-full bg-muted" />
                </div>
            </div>
        </div>
    </section>
);

const CardGridSkeleton = () => (
    <section className="py-16">
        <div className="container-tight">
            {/* Section Header */}
            <div className="text-center mb-12 space-y-3">
                <div className="h-8 w-48 mx-auto animate-pulse rounded bg-muted" />
                <div className="h-5 w-80 mx-auto animate-pulse rounded bg-muted" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl border bg-card p-6 space-y-4"
                    >
                        <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
                        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const SimplePageSkeleton = () => (
    <div className="container-tight py-12">
        <div className="space-y-4 max-w-3xl">
            <div className="h-10 w-64 animate-pulse rounded bg-muted" />
            <div className="h-5 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-8 space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="h-4 animate-pulse rounded bg-muted"
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                    />
                ))}
            </div>
        </div>
    </div>
);

// Dashboard skeleton without header/footer (dashboard has its own layout)
const DashboardSkeleton = () => (
    <div className="h-screen bg-background flex overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:flex w-56 flex-col border-r border-border bg-card p-3 gap-1.5 shrink-0">
            {/* Logo area */}
            <div className="h-9 w-28 animate-pulse rounded bg-muted/50 mb-4 mt-1" />

            {/* Search bar */}
            <div className="h-8 w-full animate-pulse rounded-lg bg-muted/50 mb-3" />

            {/* Nav section label */}
            <div className="h-2.5 w-14 animate-pulse rounded bg-muted/40 mb-1 ml-1" />

            {/* Nav items */}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                    key={i}
                    className={`h-8 w-full animate-pulse rounded-lg ${i === 1 ? 'bg-primary/10' : 'bg-muted/30'}`}
                />
            ))}

            {/* Collections section */}
            <div className="h-2.5 w-20 animate-pulse rounded bg-muted/40 mt-4 mb-1 ml-1" />
            {[1, 2, 3].map((i) => (
                <div key={`c${i}`} className="flex items-center gap-2 px-2 py-1.5">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-muted/50" />
                    <div className="h-3 flex-1 animate-pulse rounded bg-muted/30" />
                </div>
            ))}

            {/* User card at bottom */}
            <div className="mt-auto pt-3 border-t border-border">
                <div className="flex items-center gap-2.5 p-2">
                    <div className="w-6 h-6 animate-pulse rounded-full bg-muted/50" />
                    <div className="flex-1">
                        <div className="h-3 w-20 animate-pulse rounded bg-muted/40 mb-1" />
                        <div className="h-2 w-14 animate-pulse rounded bg-muted/30" />
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top header bar */}
            <header className="h-16 border-b border-border px-4 lg:px-8 flex items-center justify-between shrink-0 bg-background">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 animate-pulse rounded bg-muted/50" />
                    <div className="h-3 w-3 animate-pulse rounded bg-muted/30" />
                    <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 animate-pulse rounded bg-muted/40" />
                    <div className="h-9 w-48 animate-pulse rounded-lg bg-muted/30" />
                    <div className="h-9 w-24 animate-pulse rounded-xl bg-primary/20" />
                </div>
            </header>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page title + controls */}
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <div className="h-6 w-32 animate-pulse rounded bg-muted/50 mb-2" />
                            <div className="h-3.5 w-56 animate-pulse rounded bg-muted/30" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-16 animate-pulse rounded-lg bg-muted/30" />
                            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted/30" />
                            <div className="h-8 w-20 animate-pulse rounded-lg bg-muted/30" />
                        </div>
                    </div>

                    {/* Content Grid - 3 columns, 4 rows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[180, 240, 160, 220, 170, 250, 190, 210, 165, 230, 185, 200].map((h, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-border bg-card p-5 space-y-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted/50 flex-shrink-0" />
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-4 w-28 animate-pulse rounded bg-muted/50" />
                                        <div className="h-3 w-18 animate-pulse rounded bg-muted/30" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3.5 w-full animate-pulse rounded bg-muted/40" />
                                    <div className="h-3.5 w-[95%] animate-pulse rounded bg-muted/40" />
                                    <div className="h-3.5 w-[80%] animate-pulse rounded bg-muted/40" />
                                    {h > 190 && <div className="h-3.5 w-[60%] animate-pulse rounded bg-muted/40" />}
                                </div>
                                {h > 200 && (
                                    <div className={`animate-pulse rounded-lg bg-muted/30`} style={{ height: h - 140 }} />
                                )}
                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                    <div className="h-3 w-16 animate-pulse rounded bg-muted/30" />
                                    <div className="flex gap-1.5">
                                        <div className="w-7 h-7 animate-pulse rounded-lg bg-muted/30" />
                                        <div className="w-7 h-7 animate-pulse rounded-lg bg-muted/30" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </div>
);

// Main PageSkeleton component with real Navbar/Footer + skeleton content
interface PageSkeletonProps {
    variant?: 'landing' | 'dashboard' | 'simple';
}

const PageSkeleton = ({ variant = 'landing' }: PageSkeletonProps) => {
    // Dashboard has its own layout without shared header/footer
    if (variant === 'dashboard') {
        return <DashboardSkeleton />;
    }

    // All other pages use the real Navbar and Footer with skeleton content
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {variant === 'landing' ? (
                    <>
                        <HeroSkeleton />
                        <CardGridSkeleton />
                    </>
                ) : (
                    <SimplePageSkeleton />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PageSkeleton;
export { HeroSkeleton, CardGridSkeleton, DashboardSkeleton, SimplePageSkeleton };
