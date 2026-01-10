import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    canonicalUrl?: string;
    noIndex?: boolean;
}

/**
 * SEO component for managing document head meta tags.
 * Updates title, meta description, Open Graph, and Twitter Card tags.
 */
export default function SEO({
    title,
    description,
    keywords,
    ogImage = '/og-image.png',
    ogType = 'website',
    canonicalUrl,
    noIndex = false,
}: SEOProps) {
    const siteName = 'PostZaper';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Helper to update or create meta tags
        const updateMeta = (name: string, content: string, isProperty = false) => {
            const attr = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attr}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Basic meta tags
        updateMeta('description', description);
        if (keywords) {
            updateMeta('keywords', keywords);
        }

        // Robots
        if (noIndex) {
            updateMeta('robots', 'noindex, nofollow');
        } else {
            updateMeta('robots', 'index, follow');
        }

        // Open Graph tags
        updateMeta('og:title', fullTitle, true);
        updateMeta('og:description', description, true);
        updateMeta('og:type', ogType, true);
        updateMeta('og:site_name', siteName, true);
        updateMeta('og:image', ogImage, true);

        // Twitter Card tags
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', fullTitle);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', ogImage);

        // Canonical URL
        if (canonicalUrl) {
            let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'canonical';
                document.head.appendChild(link);
            }
            link.href = canonicalUrl;
        }

        // Cleanup on unmount - restore defaults
        return () => {
            document.title = siteName;
        };
    }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, noIndex]);

    return null;
}
