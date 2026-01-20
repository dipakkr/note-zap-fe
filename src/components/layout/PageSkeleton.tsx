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
    <div className="min-h-screen bg-gray-50">
        <div className="flex">
            {/* Sidebar Skeleton */}
            <aside className="hidden lg:flex w-64 flex-col border-r bg-white p-4 gap-2">
                {/* Logo area */}
                <div className="h-10 w-32 animate-pulse rounded bg-muted mb-6" />

                {/* Nav items */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-10 w-full animate-pulse rounded-lg bg-muted"
                    />
                ))}

                {/* Bottom CTA */}
                <div className="mt-auto">
                    <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="h-8 w-48 animate-pulse rounded bg-muted" />
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
                        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="rounded-xl border bg-white p-6 space-y-3"
                        >
                            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="rounded-xl border bg-white p-4 space-y-3"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 animate-pulse rounded-full bg-muted flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
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
